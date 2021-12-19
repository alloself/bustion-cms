<?php

namespace App\Http\Controllers\Api\CMS;

use App\Models\CMS\Page;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PageResource;
use App\Http\Traits\Search;

class PageController extends Controller
{

    use Search;

    public function nomenclature(Request $request)
    {
        $query = $this->search($request, Page::class);

        return $query->get();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Page::paginate($request->per_page ? intval($request->per_page) : 15);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $page = Page::create($request->all());
        if ($request->has('images')) {
            $page->images()->sync($request->input('images'));
        }
        if ($request->has('blocks')) {
            if (count($request->blocks) === 0) {
                $page->blocks()->sync([]);
            } else {
                foreach ($request->blocks as $key => $item) {
                    $mapped[$item['id']] = ['order' => $item['order'], 'template_id' => $item['template_id']];
                }
                $page->blocks()->sync($mapped);
            }
        }

        if ($request->has('attributes')) {
            if (count($request->all()['attributes']) === 0) {
                $page->attributes()->sync([]);
            }

            foreach ($request->all()['attributes'] as $key => $attribute) {
                $mapped[$attribute['attribute']['id']] = ['value' => $attribute['value']];
            }

            $page->attributes()->sync($mapped);
        }

        return new PageResource($page->load('images', 'blocks.pivot.template', 'template', 'attributes'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function show(Page $page)
    {
        return new PageResource($page->load('images', 'blocks.pivot.template', 'template', 'attributes'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function edit(Page $page)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Page $page)
    {
        $page->update($request->all());
        if ($request->has('images')) {
            $page->images()->sync($request->input('images'), ['type' => 'image']);
        }
        if ($request->has('blocks')) {
            if (count($request->blocks) === 0) {
                $page->blocks()->sync([]);
            } else {
                foreach ($request->blocks as $key => $item) {
                    $mapped[$item['id']] = ['order' => $item['order'], 'template_id' => $item['template_id']];
                }
                $page->blocks()->sync($mapped);
            }
        }

        if ($request->has('attributes')) {
            if (count($request->all()['attributes']) === 0) {
                $page->attributes()->sync([]);
            }

            foreach ($request->all()['attributes'] as $key => $attribute) {
                $mapped[$attribute['attribute']['id']] = ['value' => $attribute['value']];
            }

            $page->attributes()->sync($mapped);
        }


        return new PageResource($page->load('images', 'blocks.pivot.template', 'template', 'attributes'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function destroy(Page $page)
    {
        $page->delete();
        return;
    }

    public function deleteMany(Request $request)
    {
        Page::destroy($request->toArray());
        return;
    }
}
