<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\Api\CMS\PageController;
use App\Http\Controllers\Api\FileController;
use App\Http\Controllers\Api\AttributeController;
use App\Http\Controllers\Api\CMS\BlockController;
use App\Http\Controllers\Api\CMS\MenuController;
use App\Http\Controllers\Api\CMS\MenuItemController;
use App\Http\Controllers\Api\CMS\TemplateController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('cms')->group(function () {
    Route::post('/login', [AuthenticationController::class, 'login'])->name('login');

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout', [AuthenticationController::class, 'logout'])->name('logout');
        Route::get('/user', [AuthenticationController::class, 'user'])->name('user');

        Route::apiResource('page', PageController::class);
        Route::apiResource('file', FileController::class);
        Route::apiResource('attribute', AttributeController::class);
        Route::apiResource('block', BlockController::class);
        Route::apiResource('menu', MenuController::class);
        Route::apiResource('template', TemplateController::class);
        Route::apiResource('menu-item', MenuItemController::class);

        Route::prefix('destroy')->group(function () {
            Route::post('page', [PageController::class, 'deleteMany']);
            Route::post('menu', [MenuController::class, 'deleteMany']);
            Route::post('template', [TemplateController::class, 'deleteMany']);
        });
        Route::prefix('nomenclature')->group(function () {
            Route::get('page', [PageController::class, 'nomenclature']);
            Route::get('file', [FileController::class, 'nomenclature']);
            Route::get('attribute', [AttributeController::class, 'nomenclature']);
            Route::get('block', [BlockController::class, 'nomenclature']);
            Route::get('menu-item', [MenuItemController::class, 'nomenclature']);
            Route::get('template', [TemplateController::class, 'nomenclature']);
        });
    });
});
