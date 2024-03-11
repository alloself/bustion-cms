<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Laravel\Scout\Searchable;
use Kalnoy\Nestedset\NodeTrait;

class MenuItem extends Model
{
    use HasFactory, HasUuids, NodeTrait, Searchable {
        \Laravel\Scout\Searchable::usesSoftDelete insteadof \Kalnoy\Nestedset\NodeTrait;
    }

    protected $fillable = ['title', 'link', 'menu_id', 'parent_id'];

    protected $with = [
        'children',
    ];



    public function toSearchableArray()
    {
        return [
            'title' => '',
        ];
    }
}
