<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\CMS\Page;
use App\Observers\PageObserver;
use App\Http\Resources\PageResource;
use App\Models\File;
use App\Observers\FileObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        File::observe(FileObserver::class);
        Page::observe(PageObserver::class);
        PageResource::withoutWrapping();
    }
}
