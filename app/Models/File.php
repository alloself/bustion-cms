<?php

namespace App\Models;

use App\Models\CMS\Block;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $fillable = ['path', 'name', 'extension'];

    public function getPathAttribute($value)
    {
        return url($value);
    }

    public function blocks()
    {
        return $this->morphedByMany(Block::class, 'fileable')->wherePivot('type', 'image')->withPivot('value');
    }
}
