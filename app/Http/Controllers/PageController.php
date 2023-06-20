<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Traits\ModuleTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Blade;

class PageController extends Controller
{
    use ModuleTrait;

    public function model()
    {
        return Page::class;
    }


    public function cms()
    {
        return view('cms');
    }



    public function web(Request $request)
    {
        $path = array_key_exists('path', $request->route()->parameters) ? '/' . $request->route()->parameters['path'] : '/';
        $page = Page::wherePath($path)->whereHas('language', function (Builder $query) {
            $query->where('key', App::getLocale());
        })->with('blocks.descendants')->first();

        if (!$page && $path !== '/404') {
            return redirect(App::getLocale() . '/404');
        }

        if (!count($page->blocks)) {
            $page->blocks = new Collection();
        } else {

            $page->blocks->map(function ($item, $key) {
                $item->setRelation('children', $item->descendants->toTree($item->id));
            });
        }

        $header = $page->header && $page->header->template ?  Blade::render($page->header->template->value, [
            'page' => $page
        ], true) : '';

        $footer = $page->footer && $page->footer->template ?  Blade::render($page->footer->template->value, [
            'page' => $page
        ], true) : '';

        $blocks = $this->renderTree($page->blocks ?? [], ['header' => $header, 'page' => $page]);


        $template = Blade::render(
            $page->template->value,
            [
                'page' => $page,
                'header' => $header,
                'blocks' => $blocks,
                'footer' => $footer
            ],
        );

        return $template;
    }

    public function renderTree(Collection $array, $globalVariables = [])
    {
        $tree = [];

        foreach ($array as $key => $value) {


            if (count($value->children)) {
                $value->children = $this->renderTree($value->children);
            }

            array_push($tree, Blade::render(
                $value->template->value,
                [
                    'block' => $value,
                    'loop' => $key,
                    ...$globalVariables
                ],
            ));
        }

        return $tree;
    }
}
