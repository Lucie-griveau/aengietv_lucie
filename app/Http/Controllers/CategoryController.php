<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\User;

class CategoryController extends Controller
{
    public function categories (){
        return view('contacts', ['allCategories' => Category::all()]);
    }

    public function userCategories ($userID){
        return view('contacts', ['user' => User::all()->find($userID), 'allCategories' => Category::all()]);
    }
}

