<?php

namespace App\Models\CMS;

use App\Models\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class MenuItem extends Model
{
    use HasFactory, NodeTrait;

    protected $fillable = ['title', 'link', 'parent_id', 'menu_id'];

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }

    public function attributes()
    {
        return $this->morphToMany(Attribute::class, 'attributeable')->withPivot('value');
    }
}
