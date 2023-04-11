<?php

use App\Http\Controllers\BlockController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\TemplateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        Route::apiResource('page', PageController::class);
        Route::apiResource('template', TemplateController::class);
        Route::apiResource('block', BlockController::class);
        Route::apiResource('language', LanguageController::class);
        Route::prefix('destroy')->group(function () {
            Route::post('page', [PageController::class, 'deleteMany']);
            Route::post('template', [TemplateController::class, 'deleteMany']);
            Route::post('block', [BlockController::class, 'deleteMany']);
            Route::post('language', [LanguageController::class, 'deleteMany']);
        });
    });
});
