<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function userLogged ($id){
        //$user = User::all()->find($id);
        //return view('myAEngie/mytv', ['user' => $user]);
        return view('homepage', ['user' => User::all()->find($id)]);
    }
}
