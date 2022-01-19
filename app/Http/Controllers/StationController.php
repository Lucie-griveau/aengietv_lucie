<?php

namespace App\Http\Controllers;

use App\Models\Argument;
use App\Models\Station;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StationController extends Controller
{
    public function stations (){
        return view('stationsList', ['allStations' => Station::all(), 'allArguments' => Argument::all()]);
    }

    public function userStations ($userID){
        return view('stationsList', ['user' => User::all()->find($userID), 'allStations' => Station::all(), 'allArguments' => Argument::all()]);
    }

    public function station ($slug){
        //$station = DB::select('select * from stations where id=:station_id', ['station_id'=>$id]);
        //return view('station-details', ['station' => $station[0]]);

        //$station = Station::all()->find($id);
        //return view('stationDetails', ['station' => $station]);
        return view('stationDetails', ['station' => Station::all()->find($slug)]);
    }
}
