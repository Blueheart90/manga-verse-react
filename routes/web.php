<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\MangaController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\ProfileController;

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

// Library
Route::get('/users/{user}/library', [LibraryController::class, 'index'])->name(
    'users.library.index'
);

Route::post('/manga/{manga}/library', [LibraryController::class, 'store'])
    ->whereUuid('manga')
    ->name('manga.library.store');

Route::get('/manga/{manga}/library', [LibraryController::class, 'show'])
    ->whereUuid('manga')
    ->name('manga.library.show');

Route::delete('/manga/library/{library}', [
    LibraryController::class,
    'destroy',
])->name('manga.library.delete');

Route::put('/manga/library/{library}', [
    LibraryController::class,
    'update',
])->name('manga.library.update');

// Review
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/manga/{manga}/reviews', [
    ReviewController::class,
    'ReviewsByManga',
])
    ->whereUuid('manga')
    ->name('manga.reviews');

Route::get('/manga/{manga}/review/user', [
    ReviewController::class,
    'userReview',
])->name('manga.review.user');

Route::post('/manga/{manga}/reviews', [ReviewController::class, 'store'])
    ->whereUuid('manga')
    ->name('manga.review.store');

Route::put('/manga/review/{review}', [ReviewController::class, 'update'])->name(
    'manga.review.update'
);

Route::get('/manga/{id}/chapters', [MangaController::class, 'getMangaChapters'])
    ->whereUuid('id')
    ->name('manga.chapters');

Route::get('/manga/{id}/volumes', [MangaController::class, 'getMangaVolumes'])
    ->whereUuid('id')
    ->name('manga.volumes');

Route::get('/manga/{id}/{slug?}', [MangaController::class, 'show'])
    ->whereUuid('id')
    ->name('manga.show');

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
