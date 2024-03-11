<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Traits\ModuleTrait;
class LanguageController extends Controller
{
    use ModuleTrait;

    public function model()
    {
        return Language::class;
    }
}
