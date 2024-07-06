<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Kalnoy\Nestedset\NodeTrait;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\HasLink;

class DataCollecetion extends Model
{
    use HasFactory,HasLink, HasUuids, NodeTrait, SoftDeletes, Searchable {
        \Laravel\Scout\Searchable::usesSoftDelete insteadof \Kalnoy\Nestedset\NodeTrait;
    }

    protected $fillable = ['name', 'order','meta', 'parent_id', 'template_id', 'data_collecetion_type_id', 'data_collecetion_filter_id'];

    protected $casts = [
        'meta' => 'array',
    ];

    protected $with = [
        'children',
        'link'
        //'parent',
       //'template',
       // 'data_collecetion_type',
        //'data_collecetion_filter'
    ];

    public function toSearchableArray()
    {
        if (!$this->link) {
            return [
                'id' => '',
            ];
        }


        return [
            'link.title' => $this->link->title,
            'link.slug' => $this->link->slug,
            'link.subtitle' => $this->link->subtitle,
            'id' => '',
        ];
    }
}
