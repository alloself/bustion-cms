<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MenuItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'link' => $this->link,
            'title' => $this->title,
            'menu_id' => $this->menu_id,
            'parent_id' => $this->parent_id,
            'attributes' => AttributeResource::collection($this->attributes)
        ];
    }
}
