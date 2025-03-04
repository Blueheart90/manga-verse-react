<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use GuzzleHttp\Promise\Utils;
use App\Services\MangaService;
use App\Services\MangaServicetest;
use App\ViewModels\IndexMangaViewModel;
use App\ViewModels\ShowMangaViewModel;
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

    public function show(string $id, string $slug): Response
    {
        $mangaInfo = $this->mangaService->getManga($id);
        $mangaStats = $this->mangaService->getMangaStats($id);

        $mangaShowViewModel = new ShowMangaViewModel($mangaInfo, $mangaStats);

        return Inertia::render('Manga/Show', $mangaShowViewModel);
    }
    public function showTwo(string $id, string $slug): Response
    {
        $mangaInfo = $this->mangaService->getManga($id);
        $mangaStats = $this->mangaService->getMangaStats($id);

        $mangaShowViewModel = new ShowMangaViewModel($mangaInfo, $mangaStats);

        return Inertia::render('Manga/ShowTwo', $mangaShowViewModel);
    }

    // public function test(): Response
    // {
    // }
}
