<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AttributeResource extends JsonResource
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
            'attribute' => [
                'id' => $this->id,
                'name' => $this->name,
                'title' => $this->title
            ],
            'value' => $this->whenPivotLoaded('attributeables', function () {
                return $this->pivot->value;
            }),
        ];
    }
}
