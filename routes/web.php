<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
    Route::inertia('', 'dashboard')->name('dashboard');
    Route::resource('articles', ArticleController::class);
});

require __DIR__.'/settings.php';
