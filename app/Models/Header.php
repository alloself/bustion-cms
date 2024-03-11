<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;

class Header extends Model
{
    use HasFactory, Searchable, HasUuids;

    protected $fillable = ['name', 'template_id', 'menu_id'];

    protected $with = [];

    public function toSearchableArray()
    {
        return [
            'name' => '',
        ];
    }

    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class);
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }
}
