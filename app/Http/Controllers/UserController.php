<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ModuleTrait;
use Illuminate\Http\Request;

class UserController extends Controller
{

    use ModuleTrait;

    public function model()
    {
        return User::class;
    }

    public function me(Request $request)
    {
        return $request->user();
    }
}
