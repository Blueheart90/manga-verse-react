<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;

use function Illuminate\Log\log;

class MangaServicetest
{
    public function __construct(
        private FetchService $fetchService,
        private string $baseUrl = 'https://api.mangadex.org'
    ) {}

    /**
     * Retrieves a list of popular manga based on the provided limit.
     *
     * @param int $limit The maximum number of manga to retrieve (default: 10)
     * @throws \Exception If an error occurs during the request
     * @return array A list of popular manga or an error message
     */
    public function getPopular(int $limit = 10): array
    {
        $queryParams = [
            'limit' => $limit,
            'hasAvailableChapters' => 'true',
            'order' => ['followedCount' => 'desc'],
        ];

        try {
            $data = $this->fetchService->request(
                $this->baseUrl . '/manga',
                'GET',
                $queryParams
            );
            return $data['data'];
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function recentlyAdded(int $limit = 10)
    {
        $queryParams = [
            'limit' => $limit,
            'contentRating' => ['safe', 'suggestive', 'erotica'],
            'order' => ['createdAt' => 'desc'],
            'includes' => ['cover_art'],
            'hasAvailableChapters' => 'true',
        ];

        try {
            $data = $this->fetchService->request(
                $this->baseUrl . '/manga',
                'GET',
                $queryParams
            );
            return $data['data'];
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    function getLastUpdateChapters(int $limit = 24): array
    {
        $queryParams = [
            'includes' => ['scanlation_group'],
            'contentRating' => ['safe', 'suggestive', 'erotica'], // Laravel codifica  a 'contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica'
            'order[readableAt]' => 'desc',
            'limit' => $limit,
        ];

        try {
            $data = $this->fetchService->request(
                $this->baseUrl . '/chapter',
                'GET',
                $queryParams
            );

            return $data['data'];
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Retrieves a collection of the latest updated mangas.
     *
     * @param int $limit The maximum number of mangas to retrieve (default: 24)
     * @return array A collection of mangas with their latest chapters
     */
    function getLastUpdateMangas(int $limit = 24): array
    {
        // Fetch the latest updated chapters
        $chapters = $this->getLastUpdateChapters($limit);

        // Return an empty collection if no chapters are found
        if (empty($chapters)) {
            return collect();
        }

        // Group chapters by manga
        $groupedChapters = $this->groupChaptersByManga($chapters);

        // Extract unique manga IDs from the chapters
        $mangaIds = collect($chapters)
            ->pluck('relationships')
            ->flatten(1)
            ->where('type', 'manga')
            ->pluck('id')
            ->unique()
            ->toArray();

        // Combine manga with their respective chapters and return the result
        return $this->combineMangaWithChapters(
            $mangaIds,
            $groupedChapters,
            $limit
        );
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

    function combineMangaWithChapters(
        $mangaIds,
        $groupedChapters,
        $limit
    ): array {
        $queryParams = [
            'limit' => $limit,
            'includes' => ['cover_art'],
            'ids' => array_values($mangaIds),
            'contentRating' => [
                'safe',
                'suggestive',
                'erotica',
                'pornographic',
            ], // Laravel codifica  a 'contentRating[]=safe&contentRating[]....etc
        ];

        try {
            $data = $this->fetchService->request(
                $this->baseUrl . '/manga',
                'GET',
                $queryParams
            );
            $mangasData = $data['data'];
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        $combinedData = collect($mangasData)->map(function ($manga) use (
            $groupedChapters
        ) {
            $mangaId = $manga['id'];
            return array_merge($manga, [
                'chapters' => $groupedChapters[$mangaId] ?? [],
            ]);
        });

        return $combinedData->toArray();
    }
}
