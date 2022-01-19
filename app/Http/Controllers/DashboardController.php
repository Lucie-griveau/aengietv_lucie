<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Station;
use App\Models\Status;
use App\Models\User;
use App\Models\Video;

class DashboardController extends Controller
{
    public function selectStation ($userID){
        return view('/myAEngie/dashboard', ['user' => User::all()->find($userID), 'allStations' => Station::all()]);
    }

    //public function dashboard ($userID, $stationID){
    //    return view('/myAEngie/dashboard', ['user' => User::all()->find($userID), 'station'  => Station::all()->find($stationID)]);
    //}

    public function community ($userID){
        return view('/myAEngie/dashboard/community', ['user' => User::all()->find($userID), 'allStations'  => Station::all()]);
    }

    public function contributions ($userID){
        return view('/myAEngie/dashboard/contributions', ['user' => User::all()->find($userID), 'allUsers' => User::all(), 'allStations' => Station::all(), 'contributions' => Video::all(), 'statusList' => Status::all()]);
    }

    public function playlist ($userID){
        return view('/myAEngie/dashboard/playlist', ['user' => User::all()->find($userID), 'allStations'  => Station::all(), 'playlist' => Video::all()]);
    }
}
