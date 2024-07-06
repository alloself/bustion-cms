<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


//Route::redirect('/', '/' . env('APP_DEFAULT_LANGUAGE'));
Route::get('/admin{any}', [PageController::class, 'admin'])->where('any', '.*')->name('admin');
Route::get('/{path?}', [PageController::class, 'web'])->where('path', '.*')->name('web');
