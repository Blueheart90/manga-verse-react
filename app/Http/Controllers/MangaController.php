<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use GuzzleHttp\Promise\Utils;
use App\Services\MangaService;
use App\ViewModels\IndexMangaViewModel;
use App\ViewModels\ShowMangaViewModel;
use Inertia\Response;

class MangaController extends Controller
{
    public function __construct(private MangaService $mangaService) {}
    public function home(): Response
    {
        $mangaResponses = Utils::unwrap([
            'popularMangas' => $this->mangaService->getPopular(2),
            'popularNewMangas' => $this->mangaService->getPopularNew(10),
            'recentlyAddedMangas' => $this->mangaService->recentlyAdded(1),
            'lastUpdatedMangas' => $this->mangaService->getLastUpdateMangas(1),
        ]);

        $popularMangasData = json_decode(
            $mangaResponses['popularMangas']->getBody(),
            true
        )['data'];

        $popularNewMangasData = json_decode(
            $mangaResponses['popularNewMangas']->getBody(),
            true
        )['data'];

        $recentlyAddedMangasData = json_decode(
            $mangaResponses['recentlyAddedMangas']->getBody(),
            true
        )['data'];
        $lastUpdatedMangasData = $mangaResponses['lastUpdatedMangas'];

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
        $manga = json_decode(
            $this->mangaService->getManga($id)->wait()->getBody(),
            true
        )['data'];

        $mangaShowViewModel = new ShowMangaViewModel($manga);

        return Inertia::render('Manga/Show', $mangaShowViewModel);
    }

    // public function detail(string $id)
    // {
    //     $manga = $this->mangaService->getManga($id);
    //     $mangaViewModel = new MangaViewModel($manga);
    //     return Inertia::render('Manga/Detail', $mangaViewModel);
    // }
}
