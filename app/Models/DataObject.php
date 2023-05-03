<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class DataObject extends Model
{
    use HasFactory, HasUuids, Searchable;

    protected $fillable = ['title', 'attributes'];

    protected $casts = [
        'attributes' => 'array'
    ];



    protected $with = [];

    public function toSearchableArray()
    {
        return [
            'title' => ''
        ];
    }
}
