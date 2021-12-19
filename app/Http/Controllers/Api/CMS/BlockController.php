<?php

namespace App\Http\Controllers\Api\CMS;

use App\Models\CMS\Block;
use App\Models\Attribute;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\BlockResource;
use App\Http\Traits\Search;
use App\Models\File;

class BlockController extends Controller
{
    use Search;

    public function nomenclature(Request $request)
    {
        $query = $this->search($request, Block::class);

        return $query->get();
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Block::paginate($request->per_page ? intval($request->per_page) : 15);
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
        $block = Block::create($request->all());
        if ($request->has('attributes')) {
            if (count($request->all()['attributes']) === 0) {
                $block->attributes()->sync([]);
            }

            foreach ($request->all()['attributes'] as $key => $attribute) {
                $mapped[$attribute['attribute']['id']] = ['value' => $attribute['value']];
            }

            $block->attributes()->sync($mapped);
        }
        if ($request->has('blocks')) {
            if (count($request->blocks) === 0) {
                $block->blocks()->sync([]);
            } else {
                foreach ($request->blocks as $key => $item) {
                    $mapped[$item['id']] = ['order' => $item['order'], 'template_id' => $item['template_id']];
                }
                $block->blocks()->sync($mapped);
            }
        }
        if ($request->has('images')) {
            if (count($request->all()['images']) === 0) {
                $block->images()->sync([]);
            } else {
                foreach ($request->all()['images'] as $key => $image) {
                    $mapped[$image['id']] = ['value' => $image['value']];
                }
                $block->images()->sync($mapped);
            }
        }
        return new BlockResource($block->load('attributes', 'blocks', 'images'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Block  $block
     * @return \Illuminate\Http\Response
     */
    public function show(Block $block)
    {
        return new BlockResource($block->load('attributes', 'blocks', 'images'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Block  $block
     * @return \Illuminate\Http\Response
     */
    public function edit(Block $block)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Block  $block
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Block $block)
    {
        $block->update($request->all());
        if ($request->has('attributes')) {
            if (count($request->all()['attributes']) === 0) {
                $block->attributes()->sync([]);
            }

            foreach ($request->all()['attributes'] as $key => $attribute) {
                $mapped[$attribute['attribute']['id']] = ['value' => $attribute['value']];
            }

            $block->attributes()->sync($mapped);
        }
        if ($request->has('blocks')) {
            if (count($request->blocks) === 0) {
                $block->blocks()->sync([]);
            } else {
                foreach ($request->blocks as $key => $item) {
                    $mapped[$item['id']] = ['order' => $item['order'], 'template_id' => $item['template_id']];
                }
                $block->blocks()->sync($mapped);
            }
        }
        if ($request->has('images')) {
            if (count($request->all()['images']) === 0) {
                $block->images()->sync([]);
            } else {
                foreach ($request->all()['images'] as $key => $image) {
                    $mapped[$image['id']] = ['value' => $image['value']];
                }
                $block->images()->sync($mapped);
            }
        }

        return new BlockResource($block->load('attributes', 'blocks', 'images'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Block  $block
     * @return \Illuminate\Http\Response
     */
    public function destroy(Block $block)
    {
        $block->delete();
        return;
    }
}
