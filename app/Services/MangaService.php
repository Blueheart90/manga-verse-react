<?php

namespace App\Services;

use Carbon\Carbon;
use GuzzleHttp\Client;
use GuzzleHttp\Promise\PromiseInterface;

class MangaService
{
    protected $httpClient;

    public function __construct(
        private FetchService $fetchService,
        private string $baseUrl = 'https://api.mangadex.org'
    ) {
        $this->httpClient = new Client([
            'base_uri' => $this->baseUrl,
        ]);
    }

    public function getManga(string $id): PromiseInterface
    {
        $queryParams = [
            'includes' => ['cover_art'],
        ];
        return $this->httpClient->getAsync("/manga/$id", [
            'query' => $queryParams,
        ]);
    }

    /**
     * Retrieve a list of the most popular mangas.
     *
     * @param int $limit The maximum number of mangas to retrieve (default: 10)
     * @return \GuzzleHttp\Promise\PromiseInterface
     */
    public function getPopular(int $limit = 10)
    {
        $queryParams = [
            'limit' => $limit,
            'hasAvailableChapters' => 'true',
            'order' => ['followedCount' => 'desc'],
            'includes' => ['cover_art'],
        ];

        return $this->httpClient->getAsync('/manga', ['query' => $queryParams]);
    }

    /**
     * Retrieve a list of popular mangas created in the last month.
     *
     * @param int $limit The maximum number of mangas to retrieve (default: 10)
     * @return \GuzzleHttp\Promise\PromiseInterface
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

        return $this->httpClient->getAsync('/manga', ['query' => $queryParams]);
    }

    /**
     * Retrieve a list of recently added mangas.
     *
     * @param int $limit The maximum number of mangas to retrieve (default: 10)
     * @return \GuzzleHttp\Promise\PromiseInterface
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

        return $this->httpClient->getAsync('/manga', ['query' => $queryParams]);
    }

    function getLastUpdateChapters(int $limit = 24)
    {
        $queryParams = [
            'includes' => ['scanlation_group'],
            'contentRating' => ['safe', 'suggestive', 'erotica'],
            'order[readableAt]' => 'desc',
            'limit' => $limit,
        ];

        return $this->httpClient->getAsync('/chapter', [
            'query' => $queryParams,
        ]);
    }

    function getLastUpdateMangas(int $limit = 24): PromiseInterface
    {
        return $this->getLastUpdateChapters($limit)->then(function (
            $response
        ) use ($limit) {
            $chapters = json_decode($response->getBody(), true)['data'];

            if (empty($chapters)) {
                return collect();
            }

            // Group chapters by manga
            $groupedChapters = $this->groupChaptersByManga($chapters);
            $mangaIds = $this->extractMangaIds($chapters);

            return $this->fetchMangaDetails($mangaIds, $limit)->then(function (
                $mangasData
            ) use ($groupedChapters) {
                return $this->combineMangaWithChapters(
                    $mangasData,
                    $groupedChapters
                );
            });
        });
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

    private function fetchMangaDetails(
        array $mangaIds,
        int $limit
    ): PromiseInterface {
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

        // Usar getAsync para mantener la asincronía
        return $this->httpClient
            ->getAsync('/manga', ['query' => $queryParams])
            ->then(function ($response) {
                return json_decode($response->getBody(), true)['data'];
            });
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
