<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Footer extends Model
{
    use HasFactory, Searchable, HasUuids;

    protected $fillable = ['name', 'template_id'];

    protected static $baseRelations = [];

    public static function getRelationsArray()
    {
        return self::$baseRelations;
    }

    public function toSearchableArray()
    {
        return [
            'name' => '',
        ];
    }

    public function menus()
    {
        return $this->morphToMany(Menu::class, 'menuable');
    }
}
