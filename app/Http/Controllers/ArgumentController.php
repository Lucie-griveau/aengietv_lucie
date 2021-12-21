<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Argument;

class ArgumentController extends Controller
{
    public function arguments (){
        return view('stationsList', ['allArguments' => Argument::all()]);
    }
}
