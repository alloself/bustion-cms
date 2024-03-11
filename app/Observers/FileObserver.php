<?php

namespace App\Observers;

use App\Models\File;
use Illuminate\Support\Facades\Storage;

class FileObserver
{
    /**
     * Handle the file "created" event.
     *
     * @return void
     */
    public function created(File $file)
    {
        //
    }

    /**
     * Handle the file "updated" event.
     *
     * @return void
     */
    public function updated(File $file)
    {
        //
    }

    /**
     * Handle the file "deleted" event.
     *
     * @return void
     */
    public function deleted(File $file)
    {
        Storage::disk('public')->delete($file->path);
    }

    /**
     * Handle the file "restored" event.
     *
     * @return void
     */
    public function restored(File $file)
    {
        //
    }

    /**
     * Handle the file "force deleted" event.
     *
     * @return void
     */
    public function forceDeleted(File $file)
    {
        Storage::disk('public')->delete($file->path);
    }
}
