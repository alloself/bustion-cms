<?php

namespace App\Observers;

use App\Models\Link;
use App\Models\Page;
use Illuminate\Support\Facades\Log;

class LinkObserver
{
    /**
     * Handle the Link "created" event.
     */
    public function created(Link $link): void
    {
        $link->generatePath();
    }

    public function updating(Link $link): void
    {
        $link->generatePath();
    }

    /**
     * Handle the Link "deleted" event.
     */
    public function deleted(Link $link): void
    {
        //
    }

    /**
     * Handle the Link "restored" event.
     */
    public function restored(Link $link): void
    {
        //
    }

    /**
     * Handle the Link "force deleted" event.
     */
    public function forceDeleted(Link $link): void
    {
        //
    }
}
