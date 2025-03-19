<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use GuzzleHttp\Promise\Utils;
use App\Services\MangaService;
use App\Services\MangaServicetest;
use App\ViewModels\IndexMangaViewModel;
use App\ViewModels\ShowMangaViewModel;
use Illuminate\Http\Request;
use Inertia\Response;

class MangaController extends Controller
{
    public function __construct(
        private MangaService $mangaService,
        private MangaServicetest $mangaServicetest
    ) {}
    public function home(): Response
    {
        $popularMangasData = $this->mangaService->getPopular(10);
        $popularNewMangasData = $this->mangaService->getPopularNew(10);
        $recentlyAddedMangasData = $this->mangaService->recentlyAdded(1);
        $lastUpdatedMangasData = $this->mangaService->getLastUpdateMangas(1);

        $mangaViewModel = new IndexMangaViewModel(
            $popularMangasData,
            $popularNewMangasData,
            $lastUpdatedMangasData,
            $recentlyAddedMangasData
        );
        return Inertia::render('Manga/Welcome', $mangaViewModel);
    }

    public function show(string $id, string $slug, Request $request): Response
    {
        $limit = $request->query('limit', 20);
        $offset = $request->query('offset', 0);

        $mangaDetails = $this->mangaService->getManga($id);
        $mangaStatistics = $this->mangaService->getMangaStats($id);
        // $chapters = $this->mangaService->getChapters($id, $limit);

        $malId = $mangaDetails['attributes']['links']['mal'] ?? null;
        if (isset($malId)) {
            $mangaCharacter = $this->mangaService->getCharactersMal($malId);
        } else {
            $mangaCharacter = [];
        }

        $viewModel = new ShowMangaViewModel(
            $mangaDetails,
            $mangaStatistics,
            $mangaCharacter
        );

        return Inertia::render('Manga/Show', [
            'data' => $viewModel,
            // 'chapters' => $chapters,
        ]);
    }

    public function getMangaChapters(string $id, Request $request)
    {
        $limit = $request->query('limit', 15);
        $offset = $request->query('offset', 0);
        return $this->mangaService->getChapters($id, $limit, $offset);
    }
    public function showTwo(string $id, string $slug): Response
    {
        $mangaInfo = $this->mangaService->getManga($id);
        $mangaStats = $this->mangaService->getMangaStats($id);

        $malId = $mangaDetails['attributes']['links']['mal'] ?? null;
        if (isset($malId)) {
            $mangaCharacter = $this->mangaService->getCharactersMal($malId);
        } else {
            $mangaCharacter = [];
        }

        $mangaShowViewModel = new ShowMangaViewModel(
            $mangaInfo,
            $mangaStats,
            $mangaCharacter
        );

        return Inertia::render('Manga/ShowTwo', $mangaShowViewModel);
    }

    // public function test(): Response
    // {
    // }
}
