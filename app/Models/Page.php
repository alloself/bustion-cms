<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Kalnoy\Nestedset\NodeTrait;
use Laravel\Scout\Searchable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Page extends Model
{
    use HasFactory, HasSlug, NodeTrait, HasUuids, Searchable {
        \Laravel\Scout\Searchable::usesSoftDelete insteadof \Kalnoy\Nestedset\NodeTrait;
    }

    protected $fillable = ['title', 'meta', 'attributes', 'slug', 'parent_id', 'index', 'path', 'language_id', 'template_id', 'subtitle', 'show', 'footer_id', 'header_id'];

    protected $casts = [
        'index' => 'boolean',
        'show' => 'boolean',
        'meta' => 'array',
        'attributes' => 'array'
    ];

    protected $with = [
        'blocks',
        'children',
        'header',
        'footer',
        'language',
        'header',
        'template'
    ];

    public function blocks(): HasMany
    {
        return $this->hasMany(Block::class);
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }

    public function header(): BelongsTo
    {
        return $this->belongsTo(Header::class);
    }

    public function footer(): BelongsTo
    {
        return $this->belongsTo(Footer::class);
    }


    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }

    public function toSearchableArray()
    {
        return [
            'title' => '',
            'slug' => '',
            'subtitle' => '',
            'id' => '',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug')
            ->allowDuplicateSlugs();
    }

    public function generatePath()
    {
        if (!$this->index) {
            if ($this->isRoot()) {
                $this->path = $this->slug;
            } else {
                if ($this->parent->path == '/') {
                    $this->path = '/' . $this->slug;
                } else {
                    $this->path = $this->parent->path . '/' . $this->slug;
                }
            }
        } else {
            $this->path = '/';
        }

        return $this;
    }
}
