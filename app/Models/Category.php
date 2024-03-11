<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;
use Laravel\Scout\Searchable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Category extends Model
{
    use HasFactory, NodeTrait, HasUuids, HasSlug, Searchable {
        \Laravel\Scout\Searchable::usesSoftDelete insteadof \Kalnoy\Nestedset\NodeTrait;
    }

    protected $fillable = ['title', 'slug', 'order', 'parent_id'];

    protected $with = [
        'children',
        'products'
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
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
