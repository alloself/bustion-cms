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

        if ($request->has('files')) {
            foreach ($values['files'] as $key => $file) {
                $mapped[$file['id']] = ['key' => '', 'type' => 'file'];
            }
            $model->files()->sync($mapped);
        }


        return redirect(url()->previous());
    }
}
