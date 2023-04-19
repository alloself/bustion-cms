<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Template extends Model
{
    use HasFactory, HasUuids, Searchable;

    protected $fillable = ['name', 'value'];

    protected $with = [];

    public function toSearchableArray()
    {
        return [
            'name' => ''
        ];
    }
}
