<?php

namespace App\ViewModels;

use Illuminate\Support\Str;
use Illuminate\Support\Collection;

class ShowMangaViewModel extends MangaBaseViewModel
{
    public function __construct(public array $manga) {}

    public function manga(): Collection
    {
        logger('desde show manga');
        return $this->formatMangaData($this->manga);
    }

    private function formatMangaData(array $manga): Collection
    {
        $coverUrl = $this->getCoverUrl($manga);
        $thumbnailSm = $this->getCoverUrl($manga, 256);
        $thumbnailMd = $this->getCoverUrl($manga, 512);
        $attributes = [
            'title' => $this->getTitle($manga),
            'slug' => Str::slug($this->getTitle($manga)),
            'title-spa' => $this->getTitleSpa($manga),
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
    }
}
