<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Manga>
 */
class MangaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // $Manga = collect([
        //     [
        //         'title' => 'Shingeki',
        //         'external_id' => '304ceac3-8cdb-4fe7-acf7-2b6ff7a60613',
        //         'cover_url' =>
        //             'https://uploads.mangadex.org/covers/304ceac3-8cdb-4fe7-acf7-2b6ff7a60613/628b5f74-4692-47d6-8fe3-75813714b433.jpg.256.jpg',
        //     ],
        //     [
        //         'title' => 'Solo Leveling',
        //         'external_id' => '32d76d19-8a05-4db0-9fc2-e0b0648fe9d0',
        //         'cover_url' =>
        //             'https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.256.jpg',
        //     ],
        // ])->random();

        // return [
        //     'external_id' => $Manga['external_id'],
        //     'title' => $Manga['title'],
        //     'cover_url' => $Manga['cover_url'],
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ];
        return [];
    }
}
