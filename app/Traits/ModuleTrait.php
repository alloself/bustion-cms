<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

trait ModuleTrait
{
    abstract public function model();

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->input('paginate') == true) {
            return $this->model()::search($request->input('search'))->paginate($request->input('per_page') ? intval($request->input('per_page')) : 15);
        } else {
            return $this->model()::search($request->input('search'))->get();
        }
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $values = $request->all();

        $model = $this->model()::create($values);


        if ($request->has('images')) {
            if (count($values['images']) === 0) {
                $model->images()->sync([]);
            } else {
                foreach ($values['images'] as $key => $image) {
                    $mapped[$image['id']] = ['key' => $image['pivot']['key'], 'type' => 'image'];
                }
                $model->images()->sync($mapped);
            }
        }

        if ($request->has('files')) {
            if (count($values['files']) === 0) {
                $model->files()->sync([]);
            } else {
                foreach ($values['files'] as $key => $file) {
                    $mapped[$file['id']] = ['key' => $file['pivot']['key'], 'type' => 'file'];
                }
                $model->files()->sync($mapped);
            }
        }

        if ($model->images) {
            $model->load('images');
        }
        if ($model->files) {
            $model->load('files');
        }

        return $model;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $model = $this->model()::findOrFail($id);

        return $model;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {



        $values = $request->all();


        $model = $this->model()::findOrFail($id);



        $model->update($values);

        if ($request->has('images')) {
            if (count($values['images']) === 0) {
                $model->images()->sync([]);
            } else {
                foreach ($values['images'] as $key => $image) {
                    $mapped[$image['id']] = ['key' => $image['pivot']['key'], 'type' => 'image'];
                }
                $model->images()->sync($mapped);
            }
        }

        if ($request->has('files')) {
            if (count($values['files']) === 0) {
                $model->files()->sync([]);
            } else {
                foreach ($values['files'] as $key => $file) {
                    $mapped[$file['id']] = ['key' => $file['pivot']['key'], 'type' => 'file'];
                }
                $model->files()->sync($mapped);
            }
        }

        if ($model->images) {
            $model->load('images');
        }
        if ($model->files) {
            $model->load('files');
        }

        return $model;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function deleteMany(Request $request)
    {
        $this->model()::destroy($request->toArray());
        return;
    }
}
