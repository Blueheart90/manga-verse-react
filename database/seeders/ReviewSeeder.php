<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Review::factory()
            ->count(100)
            ->state(
                new Sequence(
                    ['manga_id' => '304ceac3-8cdb-4fe7-acf7-2b6ff7a60613'],
                    ['manga_id' => '32d76d19-8a05-4db0-9fc2-e0b0648fe9d0']
                )
            )
            ->create();
    }
}
