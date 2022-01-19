<?php

namespace App\Http\Controllers;

use App\Models\Station;
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
}
