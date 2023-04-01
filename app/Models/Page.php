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

class Page extends Model
{
    use HasFactory, HasSlug, NodeTrait, HasUuids, Searchable {
        \Laravel\Scout\Searchable::usesSoftDelete insteadof \Kalnoy\Nestedset\NodeTrait;
    }

    protected $fillable = ['title', 'description', 'keywords', 'slug', 'parent_id', 'index', 'path', 'language_id', 'template_id', 'subtitle'];

    protected $casts = [
        'index' => 'boolean',
    ];

    protected static $baseRelations = [
        'blocks',
    ];

    public static function getRelationsArray()
    {
        return self::$baseRelations;
    }

    public function blocks(): HasMany
    {
        return $this->hasMany(Block::class);
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
            ->saveSlugsTo('slug');
    }

    public function generatePath()
    {
        if (! $this->index) {
            if ($this->isRoot()) {
                $this->path = $this->slug;
            } else {
                if ($this->parent->path == '/') {
                    $this->path = '/'.$this->slug;
                } else {
                    $this->path = $this->parent->path.'/'.$this->slug;
                }
            }
        } else {
            $this->path = '/';
        }

        return $this;
    }
}
