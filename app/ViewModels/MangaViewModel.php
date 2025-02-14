<?php

namespace App\ViewModels;

use Illuminate\Support\Collection;
use Spatie\ViewModels\ViewModel;

class MangaViewModel extends ViewModel
{
    public function __construct(
        public array $popularMangas,
        public array $lastUpdateMangas,
        public array $recentlyAdded
    ) {}

    public function popularMangas(): Collection
    {
        return $this->formatMangaData($this->popularMangas);
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
            $attributes = [
                'title' => $this->getTitle($manga),
                'cover-art' => $coverUrl,
                'tags' => $this->getTags($manga),
                'description' => $this->getDescription($manga),
            ];

            // Combina los atributos nuevos con los datos originales y excluye 'relationships'
            return collect($manga)
                ->merge($attributes)
                ->except(['relationships']);
        });
    }

    private function getCoverUrl(array $mangaAttributes): string
    {
        if (isset($mangaAttributes['relationships'])) {
            $coverFileName =
                collect($mangaAttributes['relationships'])->firstWhere(
                    'type',
                    'cover_art'
                )['attributes']['fileName'] ?? null;

            if ($coverFileName) {
                return "https://uploads.mangadex.org/covers/{$mangaAttributes['id']}/{$coverFileName}";
            }
        }

        return '';
    }

    private function getTitle(array $mangaAttributes): string
    {
        return $mangaAttributes['attributes']['title']['es'] ??
            ($mangaAttributes['attributes']['title']['en'] ??
                array_values($mangaAttributes['attributes']['title'])[0]);
    }

    private function getTags(array $mangaAttributes): Collection
    {
        return collect($mangaAttributes['attributes']['tags'])
            ->pluck('attributes.name')
            ->flatten(1);
    }

    private function getDescription(array $mangaAttributes): string
    {
        $descriptions = $mangaAttributes['attributes']['description'] ?? [];
        return $descriptions['es'] ??
            ($descriptions['en'] ??
                (array_values($descriptions)[0] ?? 'No existe descripción'));
    }
}
