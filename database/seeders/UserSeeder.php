<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Jesus David',
            'email' => 'chuchober@hotmail.com',
            'password' => Hash::make('123456'),
            'email_verified_at' => Carbon::now(),
        ]);

        User::factory()->count(20)->create();
    }
}
