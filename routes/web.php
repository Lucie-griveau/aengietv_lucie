<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ArgumentController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MyTVController;
use App\Http\Controllers\StationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route to get homepage view
Route::get('/', function () {
    return view('homepage');
});

// Routes to station views
Route::get('/channels', [StationController::class, 'stations']);
Route::get('/channels/{user_id}', [StationController::class, 'stations']);
Route::get('/channel/{station_id}', [StationController::class, 'station']);
//get('/channel/{station_slug}'

// Route to contents view
Route::get('/contents', [VideoController::class, 'contents']);
Route::get('/contents/{user_id}', [VideoController::class, 'contents']);

// Routes to myAEngieTv views
Route::get('/mytv/{user_id}', [MyTVController::class, 'userTV']);
Route::get('/mytv/{user_id}/showreel', [MyTVController::class, 'userShowreel']);
Route::get('/mytv/{user_id}/library', [MyTVController::class, 'userLibrary']);
Route::get('/mytv/{user_id}/notifications', [MyTVController::class, 'userNotifications']);
Route::get('/mytv/{user_id}/user_settings', [MyTVController::class, 'userSettings']);

Route::get('/mytv/{user_id}/dashboard/', [MyTVController::class, 'selectStation']);
Route::get('/mytv/{user_id}/dashboard/{station_id}', [MyTVController::class, 'userDashboard']);
Route::get('/mytv/{user_id}/dashboard/contributions', [MyTVController::class, 'contributions']);
Route::get('/mytv/{user_id}/dashboard/settings/community', [MyTVController::class, 'communitySettings']);

// Route to contacts view
Route::get('/support', [CategoryController::class, 'categoryDisplay']);

// Route to register
Route::get('/register', function () {
    return view('connection/register');
});

// Route to login ==> to modify as popup!
Route::get('/login', function () {
    return view('connection/login');
});
Route::get('/confirm', function () {
    return view('connection/confirm');
});
Route::get('/reset_password', function () {
    return view('connection/resetPassword');
});

