<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Laravel\Scout\Searchable;

class Attribute extends Model
{
    use HasFactory, HasUuids, Searchable;

    protected $fillable = ['name', 'key'];

    public function toSearchableArray()
    {
        return [
            'name' => '',
            'key' => '',
        ];
    }

    public function blocks(): MorphToMany
    {
        return $this->morphedByMany(Block::class, 'attributeable')->withPivot('value');
    }
}
