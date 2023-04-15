<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Header extends Model
{
    use HasFactory;


    protected $fillable = ['name', 'template_id'];


    public function menus()
    {
        return $this->morphToMany(Menu::class, 'menuable');
    }
}
