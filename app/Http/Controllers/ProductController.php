<?php

namespace App\Http\Controllers;

use App\Traits\Search;
use App\Models\Product;
use App\Traits\ModuleTrait;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    use ModuleTrait, Search;

    public function model()
    {
        return Product::class;
    }

    public function nomenclature(Request $request)
    {
        $query = $this->search($request, Product::class);

        return $query->with('images', 'category', 'category.parent')->get();
    }
}
