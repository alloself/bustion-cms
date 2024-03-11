<?php

namespace App\Http\Controllers;

use App\Traits\Search;
use App\Models\Category;
use App\Traits\ModuleTrait;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    use ModuleTrait, Search;

    public function model()
    {
        return Category::class;
    }

    public function nomenclature(Request $request)
    {
        $query = $this->search($request, Category::class);

        return $query->with('children', 'children.products.images', 'children.products.attributes', 'products.images', 'products.attributes')->get();
    }
}
