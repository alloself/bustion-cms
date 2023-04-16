<?php

namespace App\Http\Controllers;

use App\Models\Footer;
use App\Traits\ModuleTrait;

class FooterController extends Controller
{
    use ModuleTrait;

    public function model()
    {
        return Footer::class;
    }
}
