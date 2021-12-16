<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ArgumentController extends Controller
{
    public function arguments (){
        return view('stationsList', ['allArguments' => Argument::all()]);
    }
}
