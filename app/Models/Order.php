<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Order extends Model
{
    use HasFactory, HasUuids, Searchable;

    protected $fillable = ['name', 'email', 'phone', 'content'];

    protected $with = [
        'files'
    ];

    protected $casts = [
        'show' => 'boolean',
    ];

    public function toSearchableArray()
    {
        return [
            'name' => '',
            'email' => '',
            'phone' => '',
        ];
    }


    public function files()
    {
        return $this->morphToMany(File::class, 'fileable')->wherePivot('type', 'file')->withPivot('key', 'order');
    }
}
