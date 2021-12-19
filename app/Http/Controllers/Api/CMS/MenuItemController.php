<?php

namespace App\Http\Controllers\Api\CMS;

use App\Models\CMS\MenuItem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\MenuItemResource;
use App\Http\Traits\Search;
use App\Models\Attribute;

class MenuItemController extends Controller
{

    use Search;

    public function nomenclature(Request $request)
    {
        $query = $this->search($request, MenuItem::class, 'name', true);

        return $query->with('parent', 'attributes')->get();
    }



    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $menuItem = MenuItem::create($request->all());
        if ($request->has('attributes')) {
            if (count($request->all()['attributes']) === 0) {
                $menuItem->attributes()->sync([]);
            }

            foreach ($request->all()['attributes'] as $key => $attribute) {
                $menuItem->attributes()->sync([$attribute['attribute']['id'] => ['value' => $attribute['value']]]);
            }
        }


        return new MenuItemResource($menuItem->load('attributes'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MenuItem  $menuItem
     * @return \Illuminate\Http\Response
     */
    public function show(MenuItem $menuItem)
    {
        return new MenuItemResource($menuItem->load('attributes'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MenuItem  $menuItem
     * @return \Illuminate\Http\Response
     */
    public function edit(MenuItem $menuItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MenuItem  $menuItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MenuItem $menuItem)
    {
        $menuItem->update($request->all());
        if ($request->has('attributes')) {
            if (count($request->all()['attributes']) === 0) {
                $menuItem->attributes()->sync([]);
            }

            foreach ($request->all()['attributes'] as $key => $attribute) {
                $menuItem->attributes()->sync([$attribute['attribute']['id'] => ['value' => $attribute['value']]]);
            }
        }

        return new MenuItemResource($menuItem->load('attributes'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MenuItem  $menuItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(MenuItem $menuItem)
    {
        //
    }
}
