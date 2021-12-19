<?php

namespace App\Models\CMS;

use App\Models\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\File;
use AjCastro\EagerLoadPivotRelations\EagerLoadPivotTrait;

class Block extends Model
{
    use HasFactory, EagerLoadPivotTrait;

    protected $fillable = ['content', 'name', 'title', 'subtitle','link'];

    public function files()
    {
        return $this->morphToMany(File::class, 'fileable')->wherePivot('type', 'file');
    }

    public function images()
    {
        return $this->morphToMany(File::class, 'fileable')->wherePivot('type', 'image')->withPivot('value');
    }

    public function attributes()
    {
        return $this->morphToMany(Attribute::class, 'attributeable')->withPivot('value');
    }

    public function blocks()
    {
        return $this->morphedByMany(Block::class, 'blockable')->withPivot('order', 'template_id')->using(Blockable::class)->as('blockable');
    }

    public function pages()
    {
        return $this->morphToMany(Page::class, 'blockable')->withPivot('order', 'template_id')->using(Blockable::class);
    }
}
