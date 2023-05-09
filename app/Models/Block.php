<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Kalnoy\Nestedset\NodeTrait;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Block extends Model implements HasMedia
{
    use InteractsWithMedia, HasFactory, NodeTrait, HasUuids, HasSlug, Searchable {
        \Laravel\Scout\Searchable::usesSoftDelete insteadof \Kalnoy\Nestedset\NodeTrait;
    }


    protected $fillable = ['name', 'link', 'content', 'slug', 'subtitle', 'template_id', 'title', 'page_id', 'show', 'parent_id'];

    protected $with = [
        'template',
        'children'
    ];


    public function toSearchableArray()
    {
        return [
            'name' => '',
            'title' => '',
            'subtitle' => '',
            'content' => '',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }
}
