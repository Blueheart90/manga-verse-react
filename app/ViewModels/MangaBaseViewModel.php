<?php

namespace App\ViewModels;

use Spatie\ViewModels\ViewModel;
use Illuminate\Support\Collection;

abstract class MangaBaseViewModel extends ViewModel
{
    protected function getCoverUrl(
        array $mangaAttributes,
        int $size = null
    ): string {
        if (isset($mangaAttributes['relationships'])) {
            $coverFileName =
                collect($mangaAttributes['relationships'])->firstWhere(
                    'type',
                    'cover_art'
                )['attributes']['fileName'] ?? null;

            if ($coverFileName) {
                $baseImageUrl = "https://uploads.mangadex.org/covers/{$mangaAttributes['id']}/{$coverFileName}";

                // Si se especifica un tamaño, añadirlo a la URL
                if ($size && in_array($size, [256, 512])) {
                    return "{$baseImageUrl}.{$size}.jpg";
                }

                // Si no se especifica un tamaño, devolver la imagen original
                return $baseImageUrl;
            }
        }
        // Si no hay portada disponible, devolver una cadena vacía
        return '';
    }

    protected function getTitleSpa(array $mangaAttributes): ?string
    {
        $this->getOriginalTitle($mangaAttributes);
        $alternativeTitles = collect(
            $mangaAttributes['attributes']['altTitles']
        )
            ->flatMap(fn(array $titles) => $titles)
            ->all();

        return $alternativeTitles['es'] ??
            ($alternativeTitles['es-la'] ?? null);
    }

    protected function getTitle(array $mangaAttributes): string
    {
        return $mangaAttributes['attributes']['title']['es'] ??
            ($mangaAttributes['attributes']['title']['en'] ??
                array_values($mangaAttributes['attributes']['title'])[0]);
    }

    protected function getOriginalTitle(array $mangaAttributes): ?string
    {
        $originalLang = $mangaAttributes['attributes']['originalLanguage'];

        $alternativeTitles = collect(
            $mangaAttributes['attributes']['altTitles']
        )
            ->flatMap(fn(array $titles) => $titles)
            ->all();

        return $alternativeTitles[$originalLang] ?? null;
    }

    protected function getTags(array $mangaAttributes): Collection
    {
        return collect($mangaAttributes['attributes']['tags'])
            ->pluck('attributes.name')
            ->flatten(1);
    }

    protected function getStaff(array $mangaAttributes): array
    {
        $staff = [
            'authors' => [],
            'artists' => [],
        ];

        if (!empty($mangaAttributes['relationships'])) {
            $relationships = collect($mangaAttributes['relationships']);

            foreach (['author', 'artist'] as $role) {
                $staff[$role . 's'] = $relationships
                    ->where('type', $role)
                    ->pluck('attributes.name')
                    ->all();
            }
        }

        return $staff;
    }

    protected function getDescription(array $mangaAttributes): string
    {
        $descriptions = $mangaAttributes['attributes']['description'] ?? [];
        return $descriptions['es'] ??
            ($descriptions['en'] ??
                (array_values($descriptions)[0] ?? 'No existe descripción'));
    }
}
