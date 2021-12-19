<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $blocks = BlockResource::collection($this->blocks);

        return [
            'id' => $this->id,
            'description' => $this->description,
            'index' => $this->index,
            'keywords' => $this->keywords,
            'parent_id' => $this->parent_id,
            'template_id' => $this->template_id,
            'path' => url($this->path),
            'slug' => $this->slug,
            'language_id' => $this->language_id,
            'title' => $this->title,
            'template' => $this->template,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
            'images' => $this->images,
            'blocks' => $blocks,
            'attributes' => AttributeResource::collection($this->attributes),
        ];
    }
}
