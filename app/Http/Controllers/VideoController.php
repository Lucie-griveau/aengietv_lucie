<?php

namespace App\Http\Controllers;

use App\Models\Station;
use App\Models\Video;

class VideoController extends Controller
{
    public function contents (){
        return view('contents', ['allVideos' => Video::all(), 'allStations' => Station::all()]);
    }
}

