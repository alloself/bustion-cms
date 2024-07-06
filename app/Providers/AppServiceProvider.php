<?php

namespace App\Providers;

use App\Models\File;
use App\Models\Link;
use App\Models\Page;
use App\Observers\FileObserver;
use App\Observers\LinkObserver;
use App\Observers\PageObserver;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::preventLazyLoading(false);
        Page::observe(PageObserver::class);
        Link::observe(LinkObserver::class);
        File::observe(FileObserver::class);

        Relation::morphMap([
            'page' => Page::class,
        ]);
    }
}
