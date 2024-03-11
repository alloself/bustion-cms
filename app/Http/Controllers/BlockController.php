<?php

namespace App\Http\Controllers;

use App\Models\Block;
use App\Traits\ModuleTrait;

class BlockController extends Controller
{
    use ModuleTrait;

    public function model()
    {
        return Block::class;
    }
}
