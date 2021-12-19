<?php

namespace App\Models\CMS;

use App\Models\Attribute;
use App\Models\File;
use App\Models\CMS\Pageable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;
use Cviebrock\EloquentSluggable\Sluggable;
use Cviebrock\EloquentSluggable\Services\SlugService;


class Page extends Model
{
    use HasFactory, Sluggable, NodeTrait {
        NodeTrait::replicate as replicateNode;
        Sluggable::replicate as replicateSlug;
    }

    protected $fillable = ['title', 'description', 'keywords', 'slug', 'parent_id', 'index', 'path', 'language_id', 'template_id'];

    protected $casts = [
        'index' => 'boolean',
    ];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title',
                'onUpdate' => true
            ]
        ];
    }

    public function generatePath()
    {
        if (!$this->index) {
            if ($this->isRoot()) {
                $this->path = $this->slug;
            } else {
                if ($this->parent->path == '/') {
                    $this->path = $this->slug;
                } else {
                    $this->path = $this->parent->path . '/' . $this->slug;
                }
            }
        } else {

            $this->path = '/';
        }

        return $this;
    }

    public function replicate(array $except = null)
    {
        $instance = $this->replicateNode($except);
        (new SlugService())->slug($instance, true);

        return $instance;
    }


    public function images()
    {
        return $this->morphToMany(File::class, 'fileable')->wherePivot('type', 'image');
    }

    public function blocks()
    {
        return $this->morphToMany(Block::class, 'blockable')->withPivot('order', 'template_id')->using(Blockable::class);
    }

    public function template()
    {
        return $this->belongsTo(Template::class);
    }

    public function attributes()
    {
        return $this->morphToMany(Attribute::class, 'attributeable')->withPivot('value');
    }
}
