<?php

namespace App\Http\Controllers;

use App\Models\Block;
use App\Models\Page;
use App\Traits\ModuleTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Blade;

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

        /*if (!$page && $path !== '/404') {
            return redirect(App::getLocale() . '/404');
        }*/


        $page->blocks->map(function ($item, $key) {
            $item->setRelation('children', $item->descendants->toTree($item->id));
        });

        $header = $page->header && $page->header->template ?  Blade::render($page->header->template->value, [], true) : '';

        return Blade::render(
            $page->template->value,
            [
                'page' => $page,
                'header' => $header,
                'footer' => ''
            ],
            true
        );
    }

    public function renderTree(array $array = [])
    {
        $tree = [];

        foreach ($array as $key => $value) {
            array_push($tree, Blade::render($value->template->value));
            if (count($value->template->children)) {
                $this->renderTree($value->template->children);
            }
        }
    }
}
