<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Product extends Model
{
    use HasFactory, HasSlug, HasUuids, Searchable;

    protected $fillable = ['title', 'slug', 'order', 'description', 'nutritional', 'price', 'weight', 'category_id'];


    protected $with = [
        'attributes',
        'images'
    ];


    public function toSearchableArray()
    {
        return [
            'title' => '',
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

    public function attributes()
    {
        return $this->morphToMany(Attribute::class, 'attributeable')->withPivot('value');
    }

    public function files()
    {
        return $this->morphToMany(File::class, 'fileable')->wherePivot('type', 'file')->withPivot('key', 'order');
    }

    public function images()
    {
        return $this->morphToMany(File::class, 'fileable')->wherePivot('type', 'image')->withPivot('key', 'order');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
