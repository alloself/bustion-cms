<?php

namespace App\Observers;

use App\Models\Link;
use App\Models\Page;
use Illuminate\Support\Facades\Log;

class PageObserver
{
    /**
     * Handle the Page "created" event.
     *
     * @return void
     */
    public function creating(Page $page)
    {
        $page->link->generatePath();
    }

    /**
     * Handle the Page "updated" event.
     *
     * @return void
     */
    public function updating(Page $page)
    {
        /*if ($page->path === $page->getOriginal('path')) {
            $page->generatePath();
        }*/
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(Page $page)
    {

        $page->link->generatePath();
        /*if ($page->hasChildren()) {
            $page->load('descendants');
            foreach ($page->descendants as $key => $descendant) {
                $descendant->load('parent');
                $descendant->generatePath();
                $descendant->save();
            }
        }
        Page::generateSitemap();*/
    }

    /**
     * Handle the Page "deleted" event.
     *
     * @return void
     */
    public function deleted(Page $page)
    {
        Page::generateSitemap();
    }

    /**
     * Handle the Page "restored" event.
     *
     * @return void
     */
    public function restored(Page $page)
    {
        Page::generateSitemap();
    }

    /**
     * Handle the Page "force deleted" event.
     *
     * @return void
     */
    public function forceDeleted(Page $page)
    {
        Page::generateSitemap();
    }
}
