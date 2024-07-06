<?php

namespace App\Http\Controllers;

use App\Models\DataCollecetion;
use App\Traits\ModuleTrait;

class DataCollecetionController extends Controller
{ 
    use ModuleTrait;

    public function model()
    {
        return DataCollecetion::class;
    }
}
