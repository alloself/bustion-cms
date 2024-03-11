<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Facades\Log;

class Link extends Model
{
    use HasFactory, HasSlug, HasUuids;

    protected $fillable = ['title', 'subtitle', 'slug', 'path', 'key'];

    public function generatePath()
    {
        if ($this->linkable instanceof Page) {

            $page = $this->linkable;

            if (!$page->index) {
                if ($page->isRoot()) {

                    $this->path = '/' . $this->slug;
                } else {
                    if ($page->parent->link->path == '/') {
                        $this->path = '/' . $this->slug;
                    } else {
                        $this->path = $page->parent->link->path . '/' . $this->slug;
                    }
                }
            } else {
                $this->path = '/';
            }
        }



        return $this;
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug')
            ->allowDuplicateSlugs();
    }

    public function linkable(): MorphTo
    {
        return $this->morphTo();
    }
}
