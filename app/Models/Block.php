<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Kalnoy\Nestedset\NodeTrait;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Block extends Model
{
    use HasFactory, NodeTrait, HasUuids, HasSlug;

    protected $fillable = ['name', 'link', 'content', 'slug', 'subtitle', 'template_id', 'title', 'page_id', 'show'];

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
}
