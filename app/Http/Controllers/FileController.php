<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Traits\ModuleTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\ImageOptimizer\OptimizerChainFactory;

class FileController extends Controller
{

    use ModuleTrait;

    public function model()
    {
        return File::class;
    }

    public static function store(Request $request)
    {
        $originalFile = $request->file('file');
        $name = $originalFile->getClientOriginalName();
        $path = $originalFile->storeAs('public/files', uniqid() . "." . $originalFile->getClientOriginalExtension());

        $optimizerChain = OptimizerChainFactory::create();
        $optimizerChain->optimize($path);

        $file = File::create([
            'path' => $path,
            'name' => $name,
            'extension' => $originalFile->getClientOriginalExtension(),
        ]);

        return $file;
    }

    public static function create($file)
    {
        $name = $file->getClientOriginalName();
        $path = $file->storeAs('public/files', uniqid() . "." . $file->getClientOriginalExtension());

        $optimizerChain = OptimizerChainFactory::create();
        $optimizerChain->optimize($path);

        $file = File::create([
            'path' => $path,
            'name' => $name,
            'extension' => $file->getClientOriginalExtension(),
        ]);

        return $file;
    }



    public static function deleteUnused(Request $request)
    {
        $files =  File::doesntHave('blocks')->get();

        $files->map(function ($file) {
            Storage::disk('public')->delete($file->path);
        });

        return File::doesntHave('blocks')->delete();
    }
}
