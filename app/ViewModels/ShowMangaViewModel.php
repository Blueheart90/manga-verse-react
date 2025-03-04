<?php

namespace App\ViewModels;

use Illuminate\Support\Str;
use Illuminate\Support\Collection;

class ShowMangaViewModel extends MangaBaseViewModel
{
    public function __construct(
        public array $manga,
        public array $statistics
    ) {}

    public function manga(): Collection
    {
        return $this->formatMangaData($this->manga);
    }
    public function statistics(): array
    {
        if (empty($this->statistics)) {
            return [];
        }

        $firstStat = array_values($this->statistics)[0];
        $rating = $firstStat['rating'];
        $roundedBayesian = round($rating['bayesian'], 2);

        $newrating = collect($rating)->merge(['rounded' => $roundedBayesian]);
        $firstStat['rating'] = $newrating;
        return $firstStat;
    }

    private function formatMangaData(array $manga): Collection
    {
        $coverUrl = $this->getCoverUrl($manga);
        $thumbnailSm = $this->getCoverUrl($manga, 256);
        $thumbnailMd = $this->getCoverUrl($manga, 512);
        $attributes = [
            'title' => $this->getTitle($manga),
            'slug' => Str::slug($this->getTitle($manga)),
            'title_spa' => $this->getTitleSpa($manga),
            'original_title' => $this->getOriginalTitle($manga),
            'staff' => $this->getStaff($manga),
            'cover_art' => $coverUrl,
            'thumbnail_sm' => $thumbnailSm,
            'thumbnail_md' => $thumbnailMd,
            'tags' => $this->getTags($manga),
            'description' => $this->getDescription($manga),
            'info' => $this->getInfo($manga, [
                'rating' => $this->statistics()['rating']['rounded'],
            ]),
        ];

        // Combina los atributos nuevos con los datos originales y excluye 'relationships'
        return collect($manga)
            ->merge($attributes)
            ->except(['relationships']);
    }
}
