<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Kalnoy\Nestedset\NodeTrait;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\SoftDeletes;

class Block extends Model
{
    use HasFactory, NodeTrait, SoftDeletes, HasUuids, HasSlug, Searchable {
        \Laravel\Scout\Searchable::usesSoftDelete insteadof \Kalnoy\Nestedset\NodeTrait;
    }


    protected $fillable = ['name', 'content', 'slug', 'subtitle', 'template_id', 'title', 'page_id', 'show', 'parent_id', 'order', 'attributes'];

    protected $with = [
        'template',
        'children',
        'images',
        'files'
    ];

    protected $casts = [
        'show' => 'boolean',
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
            ->generateSlugsFrom('name')
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

    public function comments(): MorphMany
    {
        return $this->morphMany(Link::class, 'linkable');
    }

    public function files()
    {
        return $this->morphToMany(File::class, 'fileable')->wherePivot('type', 'file')->withPivot('key', 'order');
    }

    public function images()
    {
        return $this->morphToMany(File::class, 'fileable')->wherePivot('type', 'image')->withPivot('key', 'order');
    }
}
