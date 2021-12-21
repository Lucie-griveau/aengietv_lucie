<?php

namespace App\Http\Controllers;

use App\Models\Video;
use App\Models\Station;

class VideoController extends Controller
{
    public function contents (){
        return view('contents', ['videos' => Video::all(), 'stations' => Station::all()]);
    }
}

