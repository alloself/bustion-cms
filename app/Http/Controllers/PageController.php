<?php

namespace App\Http\Controllers;

use App\Models\Block;
use App\Models\Page;
use App\Traits\ModuleTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PageController extends Controller
{
    use ModuleTrait;

    public function model()
    {
        return Page::class;
    }


    public function admin()
    {
        return view('pages.admin');
    }

    public function web(Request $request)
    {
        $path = array_key_exists('path', $request->route()->parameters) ? $request->route()->parameters['path'] : '/';
        $page = Page::wherePath($path)->whereHas('language', function (Builder $query) {
            $query->where('key', App::getLocale());
        })->with('blocks.descendants')->first();

        $page->blocks->each(function ($item, $key) {
            $item->children = $item->descendants->toTree($item->id);
        });

        dump($page);
    }
}
