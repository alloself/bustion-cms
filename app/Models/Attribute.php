<?php

namespace App\Models;

use App\Models\CMS\Block;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasFactory;

    protected $fillable = ['name','title'];

    public function blocks()
    {
        return $this->morphedByMany(Block::class, 'attributeable')->withPivot('value');
    }
}
