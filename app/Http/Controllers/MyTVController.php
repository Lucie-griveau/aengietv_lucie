<?php

namespace App\Http\Controllers;

use App\Models\Station;
use App\Models\Status;
use App\Models\User;
use App\Models\Video;

class MyTVController extends Controller
{
    public function userTV ($userID){
        return view('/myAEngie/mytv', ['user' => User::all()->find($userID)]);
    }

    public function userShowreel ($userID){
        return view('/myAEngie/showreel', ['user' => User::all()->find($userID), 'userVideos' => Video::all()]);
    }

    public function userLibrary ($userID){
        return view('/myAEngie/library', ['user' => User::all()->find($userID), 'allVideos' => Video::all()]);
    }

    public function userNotifications ($userID){
        return view('/myAEngie/notifications', ['user' => User::all()->find($userID)]);
    }

    public function userSettings ($userID){
        return view('/myAEngie/userSettings', ['user' => User::all()->find($userID)]);
    }

    public function selectStation ($userID){
        return view('/myAEngie/dashboard', ['user' => User::all()->find($userID), 'allStations' => Station::all()]);
    }

    public function userDashboard ($userID, $stationID){
        return view('/myAEngie/dashboard', ['user' => User::all()->find($userID), 'station'  => Station::all()->find($stationID)]);
    }

    public function community ($stationID){
        return view('/myAEngie/dashboard/community', ['users' => User::all(), 'station'  => Station::all()->find($stationID)]);
    }

    public function contributions ($userID){
        return view('/myAEngie/dashboard/contributions', ['user' => User::all()->find($userID), 'stations' => Station::all(), 'contributions' => Video::all(), 'statusList' => Status::all()]);
    }

    public function playlist ($userID, $stationID){
        return view('/myAEngie/dashboard/playlist', ['user' => User::all()->find($userID), 'station'  => Station::all()->find($stationID), 'playlist' => Video::all()]);
    }

    public function settings ($userID, $stationID){
        return view('/myAEngie/dashboard/playlist', ['user' => User::all()->find($userID), 'station'  => Station::all()->find($stationID)]);
    }

    public function communitySettings ($userID){
        return view('/myAEngie/dashboard/settings/communitySettings', ['user' => User::all()->find($userID), 'stations' => Station::all(), 'contributors' => User::all()]);
    }

    public function stationSettings ($userID, $stationID){
        return view('/myAEngie/dashboard/settings/stationSettings', ['user' => User::all()->find($userID), 'station' => Station::all()->find($stationID)]);
    }

    public function broadcastSettings ($userID, $stationID){
        return view('/myAEngie/dashboard/settings/broadcastSettings', ['user' => User::all()->find($userID), 'station' => Station::all()->find($stationID)]);
    }
}
