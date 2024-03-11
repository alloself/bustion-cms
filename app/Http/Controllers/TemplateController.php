<?php

namespace App\Http\Controllers;

use App\Models\Template;
use App\Traits\ModuleTrait;

class TemplateController extends Controller
{
    use ModuleTrait;

    public function model()
    {
        return Template::class;
    }
}
