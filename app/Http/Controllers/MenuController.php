<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Traits\ModuleTrait;

class MenuController extends Controller
{
    use ModuleTrait;

    public function model()
    {
        return Menu::class;
    }
}
