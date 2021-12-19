<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BlockResource extends JsonResource
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
        $order = 0;
        $template_id = null;
        if ($this->pivot) {
            $template_id = $this->pivot->template ? $this->pivot->template->id : null;
            $order = $this->pivot ? $this->pivot->order : 0;
        } else {
            $template_id =  $this->blockable ? $this->blockable->template_id : null;
            $order = $this->blockable ? $this->blockable->order : 0;
        }


        return [
            'id' => $this->id,
            'content' => $this->content,
            'subtitle' => $this->subtitle,
            'title' => $this->title,
            'name' => $this->name,
            'link' => $this->link,
            'images' => $this->images,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'attributes' => AttributeResource::collection($this->attributes),
            'blocks' => $blocks,
            'images' => FileResource::collection($this->images),
            'order' => $order,
            'template_id' => $template_id
        ];
    }
}
