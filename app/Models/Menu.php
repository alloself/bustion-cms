<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class Menu extends Model
{
    use HasFactory, HasUuids, Searchable;

    protected $fillable = ['name'];

    protected $with = [
        'items',
    ];

    public function toSearchableArray()
    {
        return [
            'name' => '',
        ];
    }

    public function items(): HasMany
    {
        return $this->hasMany(MenuItem::class);
    }
}
