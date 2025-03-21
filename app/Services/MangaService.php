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

class MangaService
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

    public function getManga(string $mangaId): array
    {
        $queryParams = [
            'includes' => ['cover_art', 'author', 'artist'],
        ];

        $response = $this->mangadexHttpClient->get("/manga/$mangaId", [
            'query' => $queryParams,
        ]);

        $responseData = json_decode($response->getBody()->getContents(), true);

        return $responseData['data'];
    }

    public function getMangaStats(string $mangaId): array
    {
        $response = $this->mangadexHttpClient->get(
            "/statistics/manga/$mangaId"
        );

        $responseData = json_decode($response->getBody()->getContents(), true);

        return $responseData['statistics'];
    }

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
            'mangadex_recently_added_mangas',
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
                $response = $this->mangadexHttpClient->get('/chapter', [
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

    function getLastUpdateMangas(int $limit = 24)
    {
        $chapters = $this->getLastUpdateChapters($limit);

        if (empty($chapters)) {
            return collect();
        }

        // Group chapters by manga
        $groupedChapters = $this->groupChaptersByManga($chapters);
        $mangaIds = $this->extractMangaIds($chapters);

        $mangasData = $this->getMangaDetails($mangaIds, $limit);

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

    private function getMangaDetails(array $mangaIds, int $limit)
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
        $response = $this->mangadexHttpClient->get('/manga', [
            'query' => $queryParams,
        ]);
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

    /**
     * Retrieve a list of characters from a given MyAnimeList (MAL) id.
     *
     * @param string $malId The MAL id of the manga.
     * @param int $limit The maximum number of characters to retrieve. Defaults to 10.
     * @return array A list of characters, or an empty array if the request fails.
     */
    public function getCharactersMal(string $malId, int $limit = 10): array
    {
        $malResponse = $this->jikanHttpClient->get(
            "/v4/manga/$malId/characters"
        );

        return collect(
            json_decode($malResponse->getBody()->getContents(), true)['data']
        )
            ->take($limit)
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

    public function getChapters(
        string $mangaId,
        int $limit = 10,
        int $offset = 0
    ) {
        $queryParams = [
            'limit' => $limit,
            'offset' => $offset,
            'includes' => ['scanlation_group', 'user'],
            'order' => [
                'volume' => 'asc',
                'chapter' => 'asc',
            ],
            'contentRating' => [
                'safe',
                'suggestive',
                'erotica',
                'pornographic',
            ],
            'translatedLanguage' => ['es-la', 'es', 'en'],
        ];

        $response = $this->mangadexHttpClient->get("/manga/$mangaId/feed", [
            'query' => $queryParams,
        ]);

        $chapters = json_decode($response->getBody()->getContents(), true);

        $groupedByChapter = collect($chapters['data'])
            ->groupBy('attributes.chapter')
            ->map(
                fn($chap) => $chap->map(
                    fn($item, $chapterKey) => [
                        'id' => $item['id'],
                        'language' => $item['attributes']['translatedLanguage'],
                        'title' => $item['attributes']['title'] ?? null,
                        'scanlation_group' => $this->extractRelationshipAttribute(
                            $item['relationships'],
                            'scanlation_group',
                            'name'
                        ),
                        'user' => $this->extractRelationshipAttribute(
                            $item['relationships'],
                            'user',
                            'username'
                        ),
                        'external_url' => $item['attributes']['externalUrl'],
                        'created_at' => $item['attributes']['createdAt'],
                        'diff_publish_at' => Carbon::parse(
                            $item['attributes']['publishAt']
                        )->diffForHumans(),
                        'publish_at' => $item['attributes']['publishAt'],
                        'updated_at' => $item['attributes']['updatedAt'],
                        'pages' => $item['attributes']['pages'],
                    ]
                )
            )
            ->toArray();

        $groupedByVolume = collect($chapters['data'])
            ->map(
                fn($chapter) => collect($chapter)->merge([
                    'scanlation_group' => $this->extractRelationshipAttribute(
                        $chapter['relationships'],
                        'scanlation_group',
                        'name'
                    ),
                    'user' => $this->extractRelationshipAttribute(
                        $chapter['relationships'],
                        'user',
                        'username'
                    ),
                ])
            )
            ->groupBy('attributes.volume')
            ->map(
                fn($volumeChapters, $volume) => [
                    'volume_number' => $volume,
                    'total_chapters' => $volumeChapters->count(),
                    'chapters' => $volumeChapters
                        ->groupBy('attributes.chapter')
                        ->map(
                            fn(
                                $chapterTranslations
                            ) => $chapterTranslations->map(
                                fn($translation, $chapterKey) => [
                                    'id' => $translation['id'],
                                    'language' =>
                                        $translation['attributes'][
                                            'translatedLanguage'
                                        ],
                                    'title' =>
                                        $translation['attributes']['title'] ??
                                        null,
                                    'scanlation_group' =>
                                        $translation['scanlation_group'],
                                    'user' => $translation['user'],
                                    'external_url' =>
                                        $translation['attributes'][
                                            'externalUrl'
                                        ],
                                    'created_at' =>
                                        $translation['attributes']['createdAt'],
                                    'diff_publish_at' => Carbon::parse(
                                        $translation['attributes']['publishAt']
                                    )->diffForHumans(),
                                    'publish_at' =>
                                        $translation['attributes']['publishAt'],
                                    'updated_at' =>
                                        $translation['attributes']['updatedAt'],
                                    'pages' =>
                                        $translation['attributes']['pages'],
                                ]
                            )
                        )
                        ->toArray(),
                ]
            )
            ->values()
            ->toArray();

        // Reconstruir la respuesta completa de la API
        return [
            'result' => $chapters['result'],
            'response' => $chapters['response'],
            'data' => $groupedByVolume,
            'limit' => $chapters['limit'],
            'offset' => $chapters['offset'],
            'total' => $chapters['total'],
            'gpchat' => $groupedByChapter,
        ];
    }

    private function extractRelationshipAttribute(
        $relationships,
        $type,
        $attribute
    ) {
        $relationship = collect($relationships)->firstWhere('type', $type);
        return $relationship['attributes'][$attribute] ?? null;
    }
    // public function getChapters(
    //     string $mangaId,
    //     int $limit = 10,
    //     int $offset = 0
    // ) {
    //     $queryParams = [
    //         'limit' => $limit,
    //         'offset' => $offset,
    //         'includes' => ['scanlation_group', 'user'],
    //         'order' => [
    //             'volume' => 'asc',
    //             'chapter' => 'asc',
    //         ],
    //         'contentRating' => [
    //             'safe',
    //             'suggestive',
    //             'erotica',
    //             'pornographic',
    //         ],
    //         'translatedLanguage' => ['es-la', 'es', 'en'],
    //     ];

    //     $response = $this->mangadexHttpClient->get("/manga/$mangaId/feed", [
    //         'query' => $queryParams,
    //     ]);

    //     $chapters = json_decode($response->getBody()->getContents(), true)[
    //         'data'
    //     ];

    //     return collect($chapters)
    //         ->map(function ($chapter) {
    //             $scanlationGroup = collect(
    //                 $chapter['relationships']
    //             )->firstWhere('type', 'scanlation_group');
    //             $user = collect($chapter['relationships'])->firstWhere(
    //                 'type',
    //                 'user'
    //             );
    //             return collect($chapter)->merge([
    //                 'scanlation_group' =>
    //                     $scanlationGroup['attributes']['name'],
    //                 'user' => $user['attributes']['username'],
    //             ]);
    //         })
    //         ->groupBy('attributes.volume')
    //         ->map(function ($volumeChapters) {
    //             return $volumeChapters->groupBy('attributes.chapter'); // Agrupar por capítulo dentro del volumen
    //         })
    //         ->toArray();
    // }
}
