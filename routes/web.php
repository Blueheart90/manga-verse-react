<?php

use App\Http\Controllers\MangaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// })->name('home');

Route::get('/', [MangaController::class, 'home'])->name('home');
Route::get('/test', [MangaController::class, 'test'])->name('test');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/manga/{id}/{slug?}', [MangaController::class, 'show'])->name(
    'manga.show'
);
Route::get('/mangatwo/{id}/{slug?}', [MangaController::class, 'showTwo'])->name(
    'manga.showtwo'
);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name(
        'profile.edit'
    );
    Route::post('/profile', [ProfileController::class, 'update'])->name(
        'profile.update'
    );

    Route::delete('/profile/delete/photo', [
        ProfileController::class,
        'deletePhoto',
    ])->name('profile.delete.photo');

    Route::delete('/profile', [ProfileController::class, 'destroy'])->name(
        'profile.destroy'
    );
});

require __DIR__ . '/auth.php';
