<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Models\Link;
use App\Models\Page;
use Illuminate\Http\Request;
use App\Traits\ModuleTrait;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Blade;
use Illuminate\Database\Eloquent\Builder;

class PageController extends Controller
{
    use ModuleTrait;

    public function model()
    {
        return Page::class;
    }


    public function admin()
    {
        return view('admin');
    }

    public function renderTree(Collection $array, $globalVariables = [])
    {
        $tree = array();

        foreach ($array->sortByDesc('order') as $key => $value) {


            if (count($value->children)) {
                $value->renderedChildren = $this->renderTree($value->children);
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

    public function web(Request $request)
    {

        $languages = Language::all();
        $path = array_key_exists('path', $request->route()->parameters) ? '/' . $request->route()->parameters['path'] : '/';
        

        $link = Link::wherePath($path)->with('linkable.blocks.descendants')->first();

        $page = $link->linkable;
        /*Page::wherePath($path)->whereHas('language', function (Builder $query) {
            $query->where('key', App::getLocale());
        })->with('blocks.descendants')->first();*/

        if (!$page && $path !== '/404') {
           //return redirect(App::getLocale() . '/404');
        }
        if (!count($page->blocks)) {
            $page->blocks = new Collection();
        } else {

            $page->blocks->map(function ($item, $key) {
                $item->setRelation('children', $item->descendants->toTree($item->id));
            });
        }

        $header = $page->header && $page->header->template ?  Blade::render($page->header->template->value, [
            'page' => $page,
            'languages' => $languages
        ], true) : '';

        $footer = $page->footer && $page->footer->template ?  Blade::render($page->footer->template->value, [
            'page' => $page,
            'languages' => $languages
        ], true) : '';

    

        $blocks = $this->renderTree($page->blocks ?? [], ['header' => $header, 'page' => $page, 'languages' => $languages]);

        $template = Blade::render(
            $page->template->value,
            [
                'page' => $page,
                'header' => $header,
                'blocks' => $blocks,
                'footer' => $footer,
                'languages' => $languages
            ],
        );

        return $template;
    }
}
