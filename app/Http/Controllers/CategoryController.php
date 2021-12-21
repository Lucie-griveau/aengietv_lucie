<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function categoryDisplay (){
        return view('contacts', ['categories' => Category::all()]);
    }
}

