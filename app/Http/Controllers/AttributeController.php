<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Traits\ModuleTrait;

class AttributeController extends Controller
{

    use ModuleTrait;

    public function model()
    {
        return Attribute::class;
    }
}
