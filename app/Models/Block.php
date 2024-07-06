<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Kalnoy\Nestedset\NodeTrait;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\HasLink;

class Block extends Model
{
    use HasFactory, HasLink, NodeTrait, SoftDeletes, HasUuids, HasSlug, Searchable {
        \Laravel\Scout\Searchable::usesSoftDelete insteadof \Kalnoy\Nestedset\NodeTrait;
    }


    protected $fillable = ['name', 'content', 'template_id', 'show', 'parent_id', 'attributes'];

    protected $with = [
        'template',
        'children',
        'images',
        'files',
        'link'
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

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }

    public function blockables(): MorphToMany
    {
        return $this->morphedByMany(Block::class, 'blockable');
    }

    public function files(): MorphToMany
    {
        return $this->morphToMany(File::class, 'fileable')->wherePivot('type', 'file')->withPivot('key', 'order');
    }

    public function images(): MorphToMany
    {
        return $this->morphToMany(File::class, 'fileable')->wherePivot('type', 'image')->withPivot('key', 'order');
    }
}
