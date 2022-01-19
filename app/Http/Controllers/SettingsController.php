<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Station;
use App\Models\User;

class SettingsController extends Controller
{
    public function broadcastSettings ($userID){
        return view('/myAEngie/dashboard/settings/broadcastSettings', ['user' => User::all()->find($userID), 'allStations' => Station::all()]);
    }

    public function communitySettings ($userID){
        return view('/myAEngie/dashboard/settings/communitySettings', ['user' => User::all()->find($userID), 'allStations' => Station::all(), 'contributors' => User::all()]);
    }

    public function stationSettings ($userID){
        return view('/myAEngie/dashboard/settings/stationSettings', ['user' => User::all()->find($userID), 'allStations' => Station::all()]);
    }
}
