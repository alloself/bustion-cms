<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', '/' . env('APP_DEFAULT_LANGUAGE'));
Route::get('/cms{any}', [PageController::class, 'cms'])->where('any', '.*');
Route::prefix('{language}')->get('/{path?}', [PageController::class, 'web'])->where('path', '.*')->name('web');

Route::post('/order', [OrderController::class, 'store']);
