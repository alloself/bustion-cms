<?php

use App\Http\Controllers\AttributeController;
use App\Http\Controllers\BlockController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FooterController;
use App\Http\Controllers\HeaderController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\MenuItemController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('admin')->middleware(['auth:sanctum', 'api', 'role:root'])->group(function () {

    Route::get('/me', [UserController::class, 'me']);

    Route::apiResource('page', PageController::class);
    Route::apiResource('template', TemplateController::class);
    Route::apiResource('language', LanguageController::class);
    Route::apiResource('menu', MenuController::class);
    Route::apiResource('menu-item', MenuItemController::class);
    Route::apiResource('header', HeaderController::class);
    Route::apiResource('footer', FooterController::class);
    Route::apiResource('file', FileController::class);
    Route::apiResource('block', BlockController::class);
    Route::apiResource('user', UserController::class);
    Route::apiResource('role', RoleController::class);
    Route::apiResource('attribute', AttributeController::class);
});
