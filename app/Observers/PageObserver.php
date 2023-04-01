<?php

namespace App\Observers;

use App\Models\Page;

class PageObserver
{
    /**
     * Handle the Page "created" event.
     *
     * @return void
     */
    public function creating(Page $page)
    {
        $page->generatePath();
    }

    /**
     * Handle the Page "updated" event.
     *
     * @return void
     */
    public function updating(Page $page)
    {
        if ($page->path === $page->getOriginal('path')) {
            $page->generatePath();
        }
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(Page $page)
    {
        if ($page->hasChildren()) {
            $page->load('descendants');
            foreach ($page->descendants as $key => $descendant) {
                $descendant->load('parent');
                $descendant->generatePath();
                $descendant->save();
            }
        }
    }

    /**
     * Handle the Page "deleted" event.
     *
     * @return void
     */
    public function deleted(Page $page)
    {
        //
    }

    /**
     * Handle the Page "restored" event.
     *
     * @return void
     */
    public function restored(Page $page)
    {
        //
    }

    /**
     * Handle the Page "force deleted" event.
     *
     * @return void
     */
    public function forceDeleted(Page $page)
    {
        //
    }
}
