<?php

namespace App\ViewModels;

use Illuminate\Support\Str;
use Illuminate\Support\Collection;

class IndexMangaViewModel extends MangaBaseViewModel
{
    public function __construct(
        public array $popularMangas,
        public array $popularNewMangas,
        public array $lastUpdateMangas,
        public array $recentlyAdded
    ) {}

    public function popularMangas(): Collection
    {
        return $this->formatMangaData($this->popularMangas);
    }
    public function popularNewMangas(): Collection
    {
        return $this->formatMangaData($this->popularNewMangas);
    }

    public function lastUpdateMangas(): Collection
    {
        return $this->formatMangaData($this->lastUpdateMangas);
    }

    public function recentlyAdded(): Collection
    {
        return $this->formatMangaData($this->recentlyAdded);
    }

    private function formatMangaData(array $mangaData): Collection
    {
        return collect($mangaData)->map(function (array $manga) {
            $coverUrl = $this->getCoverUrl($manga);
            $thumbnailSm = $this->getCoverUrl($manga, 256);
            $thumbnailMd = $this->getCoverUrl($manga, 512);
            $attributes = [
                'title' => $this->getTitle($manga),
                'slug' => Str::slug($this->getTitle($manga)),
                'title-spa' => $this->getTitleSpa($manga),
                'original-title' => $this->getOriginalTitle($manga),
                'cover-art' => $coverUrl,
                'thumbnail-sm' => $thumbnailSm,
                'thumbnail-md' => $thumbnailMd,
                'tags' => $this->getTags($manga),
                'description' => $this->getDescription($manga),
            ];

            // Combina los atributos nuevos con los datos originales y excluye 'relationships'
            return collect($manga)
                ->merge($attributes)
                ->except(['relationships']);
        });
    }
}
