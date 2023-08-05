<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Traits\ModuleTrait;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    use ModuleTrait;

    public function model()
    {
        return Order::class;
    }

    public function create(Request $request)
    {
        $this->store($request);

        return redirect(url()->previous());
    }

    public function store(Request $request)
    {
        $values = $request->all();

        $model = $this->model()::create($values);

        if ($request->file('files')) {
            foreach ($request->file('files') as $key => $file) {
                $storedFile = FileController::create($file);
                $mapped[$storedFile['id']] = ['key' => '', 'type' => 'file'];
            }
            $model->files()->sync($mapped);
        }


        return redirect(url()->previous());
    }
}
