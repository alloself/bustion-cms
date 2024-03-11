<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Laravel\Scout\Searchable;

class File extends Model
{
    use HasFactory, HasUuids, Searchable;

    protected $fillable = ['path', 'name', 'extension'];

    public function getPathAttribute($value)
    {
        return url($value);
    }


    public function toSearchableArray()
    {
        return [
            'name' => '',
        ];
    }

    public function blocks(): MorphToMany
    {
        return $this->morphedByMany(Block::class, 'fileable');
    }
}
