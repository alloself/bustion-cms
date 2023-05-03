<?php

namespace App\Http\Controllers;


use App\Models\DataObject;
use App\Traits\ModuleTrait;

class DataObjectController extends Controller
{
    use ModuleTrait;

    public function model()
    {
        return DataObject::class;
    }
}
