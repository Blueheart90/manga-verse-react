<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'manga_id' => fake()->uuid(),
            'title' => fake()->sentence(5),
            'recommended' => fake()->boolean(),
            'content' => fake()->text(100),
            'rating' => fake()->numberBetween(1, 5),
        ];
    }
}
