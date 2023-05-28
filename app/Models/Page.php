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
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

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
        'header.menu.items',
        'footer',
        'language',
        'header',
        'template',
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

    public static function generateSitemap()
    {
        $sitemap = Sitemap::create();
        Page::withDepth()->get()->each(function (Page $page) use ($sitemap) {
            $sitemap->add(
                Url::create($page->path)
                    ->setLastModificationDate($page->updated_at)
                    ->setPriority($page->depth)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
            );
        });
        $sitemap->writeToFile(public_path('sitemap.xml'));
    }

    public function generateSitemapTree($sitemap)
    {
        $this->children->each(function (Page $item) use ($sitemap) {
            $sitemap->add(Url::create($item->path));
            if (count($item->children)) {
                $item->generateSitemapTree($sitemap);
            }
        });
    }
}
