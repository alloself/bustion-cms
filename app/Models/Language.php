<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Language extends Model
{
    use HasFactory, HasUuids, Searchable;

    protected $fillable = ['key', 'title'];

    public function toSearchableArray()
    {
        return [
            'title' => '',
            'key' => ''
        ];
    }

}
