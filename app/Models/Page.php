<?php

namespace App\Models;

use App\Traits\HasLink;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Kalnoy\Nestedset\NodeTrait;
use Laravel\Scout\Searchable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Facades\Log;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class Page extends Model
{
    use HasLink, HasFactory, SoftDeletes, NodeTrait, HasUuids, Searchable {
        \Laravel\Scout\Searchable::usesSoftDelete insteadof \Kalnoy\Nestedset\NodeTrait;
    }

    protected $fillable = ['index', 'meta', 'attributes', 'parent_id', 'language_id', 'template_id', 'footer_id', 'header_id'];

    protected $casts = [
        'meta' => 'array',
        'attributes' => 'array',
        'index' => 'boolean',
    ];

    protected $with = [
        'blocks',
        'children',
        'header.menu.items',
        'footer',
        'language',
        'header',
        'template',
        'link'
    ];

    public function toSearchableArray()
    {
        if (!$this->link) {
            return [
                'id' => '',
            ];
        }


        return [
            'link.title' => $this->link->title,
            'link.slug' => $this->link->slug,
            'link.subtitle' => $this->link->subtitle,
            'id' => '',
        ];
    }

    public function link(): MorphOne
    {
        return $this->morphOne(Link::class, 'linkable');
    }

    public function blocks(): MorphToMany
    {
        return $this->morphToMany(Block::class, 'blockable')->withPivot('order');
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
}
