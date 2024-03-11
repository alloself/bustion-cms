<?php

namespace App\Http\Controllers;

use App\Models\Header;
use App\Traits\ModuleTrait;

class HeaderController extends Controller
{
    use ModuleTrait;

    public function model()
    {
        return Header::class;
    }
}
