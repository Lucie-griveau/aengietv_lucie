<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ArgumentController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MyTVController;
use App\Http\Controllers\SettingsController;
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

// Routes to get homepage view
Route::get('/', function () {
    return view('homepage');
});
Route::get('/{userID}', [UserController::class, 'userLogged']);

// Routes to station views
Route::get('/channels', [StationController::class, 'stations']);
Route::get('/channels/{userID}', [StationController::class, 'userStations']);
Route::get('/channel/{stationID}', [StationController::class, 'station']);
//get('/channel/{station_slug}'

// Routes to contents view
Route::get('/contents', [VideoController::class, 'contents']);
Route::get('/contents/{userID}', [VideoController::class, 'userContents']);

// Routes to myAEngieTV views
Route::get('/mytv/{userID}', [MyTVController::class, 'userTV']);
Route::get('/mytv/{userID}/showreel', [MyTVController::class, 'userShowreel']);
Route::get('/mytv/{userID}/library', [MyTVController::class, 'userLibrary']);
Route::get('/mytv/{userID}/notifications', [MyTVController::class, 'userNotifications']);
Route::get('/mytv/{userID}/user_settings', [MyTVController::class, 'userSettings']);

// Routes to myAEngieTV > Dashboard views
Route::get('/mytv/{userID}/dashboard/', [DashboardController::class, 'selectStation']);
//Route::get('/mytv/{userID}/dashboard/{stationID}', [DashboardController::class, 'dashboard']);
Route::get('/mytv/{userID}/dashboard/community', [DashboardController::class, 'community']);
Route::get('/mytv/{userID}/dashboard/contributions', [DashboardController::class, 'contributions']);
Route::get('/mytv/{userID}/dashboard/playlist', [DashboardController::class, 'playlist']);

// Routes to myAEngieTV > Dashboard > Settings views
Route::get('/mytv/{userID}/dashboard/settings/event', [SettingsController::class, 'broadcastSettings']);
Route::get('/mytv/{userID}/dashboard/settings/community', [SettingsController::class, 'communitySettings']);
Route::get('/mytv/{userID}/dashboard/settings/station', [SettingsController::class, 'stationSettings']);

// Routes to contacts view
Route::get('/support', [CategoryController::class, 'categories']);
Route::get('/support/{userID}', [CategoryController::class, 'userCategories']);

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

