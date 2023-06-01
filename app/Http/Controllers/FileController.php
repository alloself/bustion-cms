<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Traits\ModuleTrait;
use Illuminate\Http\Request;
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
}
