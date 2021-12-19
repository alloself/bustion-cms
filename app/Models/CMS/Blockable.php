<?php

namespace App\Models\CMS;

use App\Models\CMS\Template;
use Illuminate\Database\Eloquent\Relations\MorphPivot;

class Blockable extends MorphPivot
{

    protected $fillable = ['template_id', 'order'];

    public function template()
    {
        return $this->belongsTo(Template::class);
    }
}
