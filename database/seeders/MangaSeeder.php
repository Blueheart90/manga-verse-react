<?php

namespace Database\Seeders;

use App\Models\Manga;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MangaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mangas = [
            [
                'title' => 'Shingeki',
                'id' => '304ceac3-8cdb-4fe7-acf7-2b6ff7a60613',
                'cover_url' =>
                    'https://uploads.mangadex.org/covers/304ceac3-8cdb-4fe7-acf7-2b6ff7a60613/628b5f74-4692-47d6-8fe3-75813714b433.jpg.256.jpg',
            ],
            [
                'title' => 'Solo Leveling',
                'id' => '32d76d19-8a05-4db0-9fc2-e0b0648fe9d0',
                'cover_url' =>
                    'https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.256.jpg',
            ],
        ];

        foreach ($mangas as $manga) {
            Manga::create([
                'id' => $manga['id'],
                'title' => $manga['title'],
                'cover_url' => $manga['cover_url'],
                'slug' => Str::slug($manga['title']),
            ]);
        }
    }
}
