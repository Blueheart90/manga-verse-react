<?php

namespace App\Services;

use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Collection;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Psr\Http\Message\ResponseInterface;
use GuzzleHttp\Promise\PromiseInterface;

class MangaServicetest
{
    protected $mangadexHttpClient;
    protected $jikanHttpClient;

    public function __construct(
        private string $mangadexBaseUrl = 'https://api.mangadex.org',
        private string $jikanBaseUrl = 'https://api.jikan.moe'
    ) {
        $this->mangadexHttpClient = new Client([
            'base_uri' => $this->mangadexBaseUrl,
        ]);
        $this->jikanHttpClient = new Client([
            'base_uri' => $this->jikanBaseUrl,
        ]);
    }

    public function getManga(string $id): PromiseInterface
    {
        $char = $this->getCharacters('23390')['data'];
        $queryParams = [
            'includes' => ['cover_art', 'author', 'artist'],
        ];
        return $this->mangadexHttpClient->getAsync("/manga/$id", [
            'query' => $queryParams,
        ]);
    }

    public function getMangaStats(string $id): PromiseInterface
    {
        return $this->mangadexHttpClient->getAsync("/statistics/manga/$id");
    }

    /**
     * Retrieve a list of popular mangas, sorted by followed count.
     *
     * Caches the result for 1 hour.
     *
     * @param int $limit The maximum number of mangas to retrieve
     * @return array A list of popular mangas or an empty array if the request fails
     */
    public function getPopular(int $limit = 10): array
    {
        $queryParams = [
            'limit' => $limit,
            'hasAvailableChapters' => 'true',
            'order' => [
                'followedCount' => 'desc',
            ],
            'includes' => ['cover_art'],
        ];

        return Cache::remember(
            'mangadex_popular_mangas',
            60 * 60,
            function () use ($queryParams) {
                $response = $this->mangadexHttpClient->get('/manga', [
                    'query' => $queryParams,
                ]);

                return $response->getStatusCode() === 200
                    ? json_decode($response->getBody()->getContents(), true)[
                        'data'
                    ]
                    : [];
            }
        );
    }

    /**
     * Retrieves a list of popular new mangas, sorted by followed count.
     * 'New' is defined as any manga created in the last month.
     *
     * Caches the result for 1 hour.
     *
     * @param int $limit The maximum number of mangas to retrieve
     * @return array A list of popular mangas or an empty array if the request fails
     */
    public function getPopularNew(int $limit = 10)
    {
        $oneMonthAgo = Carbon::now()
            ->subMonth()
            ->setTimezone('UTC')
            ->format('Y-m-d\TH:i:s');
        $queryParams = [
            'limit' => $limit,
            'includes' => ['cover_art', 'artist', 'author'],
            'order' => ['followedCount' => 'desc'],
            'contentRating' => ['safe', 'suggestive'],
            'hasAvailableChapters' => 'true',
            'createdAtSince' => $oneMonthAgo,
        ];

        return Cache::remember(
            'mangadex_new_popular_mangas',
            60 * 5,
            function () use ($queryParams) {
                $response = $this->mangadexHttpClient->get('/manga', [
                    'query' => $queryParams,
                ]);

                return $response->getStatusCode() === 200
                    ? json_decode($response->getBody()->getContents(), true)[
                        'data'
                    ]
                    : [];
            }
        );
    }

    /**
     * Retrieves a list of recently added mangas, sorted by creation date.
     *
     * Only includes mangas with available chapters and with a content rating of 'safe', 'suggestive', or 'erotica'.
     *
     * Caches the result for 1 hour.
     *
     * @param int $limit The maximum number of mangas to retrieve
     * @return array A list of recently added mangas or an empty array if the request fails
     */
    public function recentlyAdded(int $limit = 10)
    {
        $queryParams = [
            'limit' => $limit,
            'contentRating' => ['safe', 'suggestive', 'erotica'],
            'order' => ['createdAt' => 'desc'],
            'includes' => ['cover_art'],
            'hasAvailableChapters' => 'true',
        ];

        return Cache::remember(
            'recently_added_mangas',
            60 * 60,
            function () use ($queryParams) {
                $response = $this->mangadexHttpClient->get(
                    '/manga',
                    $queryParams
                );

                return $response->getStatusCode() === 200
                    ? json_decode($response->getBody()->getContents(), true)[
                        'data'
                    ]
                    : [];
            }
        );
    }

    function getLastUpdateChapters(int $limit = 24)
    {
        $queryParams = [
            'includes' => ['scanlation_group'],
            'contentRating' => ['safe', 'suggestive', 'erotica'],
            'order[readableAt]' => 'desc',
            'limit' => $limit,
        ];

        return Cache::remember(
            'mangadex_last_update_chapters',
            60 * 60,
            function () use ($queryParams) {
                $response = $this->mangadexHttpClient->get(
                    '/chapter',
                    $queryParams
                );

                return $response->getStatusCode() === 200
                    ? json_decode($response->getBody()->getContents(), true)[
                        'data'
                    ]
                    : [];
            }
        );
    }

    function getLastUpdateMangas(int $limit = 24)
    {
        $chapters = $this->getLastUpdateChapters($limit);

        if (empty($chapters)) {
            return collect();
        }

        // Group chapters by manga
        $groupedChapters = $this->groupChaptersByManga($chapters);
        $mangaIds = $this->extractMangaIds($chapters);

        $mangasData = $this->fetchMangaDetails($mangaIds, $limit);

        return $this->combineMangaWithChapters($mangasData, $groupedChapters);
    }

    function groupChaptersByManga($chapters): array
    {
        // Agrupar los capítulos por manga_id
        $groupedChapters = collect($chapters)
            ->groupBy(function ($chapter) {
                return collect($chapter['relationships'])->firstWhere(
                    'type',
                    'manga'
                )['id'];
            })
            ->toArray();

        return $groupedChapters;
    }

    private function fetchMangaDetails(array $mangaIds, int $limit)
    {
        $queryParams = [
            'limit' => $limit,
            'includes' => ['cover_art'],
            'ids' => array_values($mangaIds),
            'contentRating' => [
                'safe',
                'suggestive',
                'erotica',
                'pornographic',
            ],
        ];
        $response = $this->mangadexHttpClient->get('/manga', $queryParams);
        return json_decode($response->getBody()->getContents(), true)['data'];
    }

    private function extractMangaIds(array $chapters): array
    {
        return collect($chapters)
            ->pluck('relationships')
            ->flatten(1)
            ->where('type', 'manga')
            ->pluck('id')
            ->unique()
            ->values()
            ->toArray();
    }

    function getCharacters(string $id): Response
    {
        return Http::get($this->jikanBaseUrl . "/v4/manga/$id/characters");
    }

    function combineMangaWithChapters($mangasData, $groupedChapters): array
    {
        return collect($mangasData)
            ->map(function ($manga) use ($groupedChapters) {
                $mangaId = $manga['id'];
                return array_merge($manga, [
                    'chapters' => $groupedChapters[$mangaId] ?? [],
                ]);
            })
            ->toArray();
    }
}
