<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Traits\ModuleTrait;

class PageController extends Controller
{
    use ModuleTrait;

    public function model()
    {
        return Page::class;
    }
}
