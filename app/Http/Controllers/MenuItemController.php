<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Traits\ModuleTrait;

class MenuItemController extends Controller
{
    use ModuleTrait;

    public function model()
    {
        return MenuItem::class;
    }
}
