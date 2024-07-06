<?php

namespace App\Traits;

use App\Models\Link;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\Relation;
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
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $values = $request->all();

        $model = $this->model()::create($values);

        if (array_key_exists('link', $values) && method_exists($model, 'link') && $model->link() instanceof MorphOne) {
            $link = new Link($values['link']);
            $model->link()->save($link);;
        }

        if ($request->has('blocks')) {
            if (count($values['blocks']) === 0) {
                $model->blocks()->sync([]);
            } else {
                foreach ($values['blocks'] as $key => $block) {
                    $mapped[$block['id']] = ['order' => isset($block['pivot']['order']) ? $block['pivot']['order'] : 0];
                }
                $model->blocks()->sync($mapped);
            }
        }


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

        if ($request->has('attributes')) {
            if (count($values['attributes']) === 0) {
                $model->attributes()->sync([]);
            } else {
                foreach ($values['attributes'] as $key => $attribute) {
                    $mapped[$attribute['id']] = ['value' => $attribute['pivot']['value']];
                }
                $model->attributes()->sync($mapped);
            }
        }
        if ($model->attributes) {
            $model->load('attributes');
        }
        if ($model->blocks) {
            $model->load('blocks');
        }
        if ($model->images) {
            $model->load('images');
        }
        if ($model->files) {
            $model->load('files');
        }
        if ($model->link) {
            $model->load('link');
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


        if (array_key_exists('link', $values) && method_exists($model, 'link') && $model->link() instanceof MorphOne) {
            $link = Link::findOrFail($values['link']['id']);
            $link->update(['title' => $values['link']['title'], 'subtitle' => $values['link']['subtitle']]);
            $model->load('link');
        }

        if ($request->has('blocks')) {
            if (count($values['blocks']) === 0) {
                $model->blocks()->sync([]);
            } else {
                foreach ($values['blocks'] as $key => $block) {
                    $mapped[$block['id']] = ['order' => isset($block['pivot']['order']) ? $block['pivot']['order'] : 0];
                }
                $model->blocks()->sync($mapped);
            }
        }


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
        if ($request->has('attributes')) {
            if (count($values['attributes']) === 0) {
                $model->attributes()->sync([]);
            } else {
                foreach ($values['attributes'] as $key => $attribute) {
                    $mapped[$attribute['id']] = ['value' => $attribute['pivot']['value']];
                }
                $model->attributes()->sync($mapped);
            }
        }

        if ($model->attributes) {
            $model->load('attributes');
        }
        if ($model->blocks) {
            $model->load('blocks');
        }
        if ($model->images) {
            $model->load('images');
        }
        if ($model->files) {
            $model->load('files');
        }
        if ($model->link) {
            $model->load('link');
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
        $model = $this->model()::findOrFail($id);

        $model->delete();

        return;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function deleteMany(Request $request)
    {
        Log::alert($request->toArray());
        $this->model()::destroy($request->toArray());
        return;
    }
}
