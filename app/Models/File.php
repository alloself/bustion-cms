<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['path', 'name', 'extension'];

    public function getPathAttribute($value)
    {
        return url($value);
    }

    public function files()
    {
        return $this->morphToMany(File::class, 'fileable')->wherePivot('type', 'file')->withPivot('value');
    }

    public function images()
    {
        return $this->morphToMany(File::class, 'fileable')->wherePivot('type', 'image')->withPivot('value');
    }
}
