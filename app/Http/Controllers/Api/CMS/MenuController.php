<?php

namespace App\Http\Controllers\Api\CMS;

use App\Models\CMS\Menu;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CMS\MenuItem;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Menu::paginate($request->per_page ? intval($request->per_page) : 15);
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
        $menu = Menu::create($request->all());

        if ($request->has('items')) {
            MenuItem::where('menu_id', $menu->id)->update(['menu_id' => null]);
            $ids = collect($request->items)->map(function ($item) {
                return $item['id'];
            })->all();

            MenuItem::whereIn('id', $ids)->update(['menu_id' => $menu->id]);
        }
        return $menu;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function show(Menu $menu)
    {
        return $menu->load('items');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function edit(Menu $menu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Menu $menu)
    {
        $menu->update($request->all());
        if ($request->has('items')) {
            MenuItem::where('menu_id', $menu->id)->update(['menu_id' => null]);
            $ids = collect($request->items)->map(function ($item) {
                return $item['id'];
            })->all();

            MenuItem::whereIn('id', $ids)->update(['menu_id' => $menu->id]);
        }
        return $menu->load('items');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function destroy(Menu $menu)
    {
        $menu->delete();
        return;
    }

    public function deleteMany(Request $request)
    {
        Menu::destroy($request->toArray());
        return;
    }
}
