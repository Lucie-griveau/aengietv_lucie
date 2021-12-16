<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
// use Illuminate\Notifications\Notifiable;
// use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory;
        // HasApiTokens,
        // Notifiable,

    public $timestamps = false;

    protected $fillable = [
        'username',
        'email',
        'password',
        'grade',
        'picture',
        'profile',
        'active',
        'reg_date',
        'last_activity'];
    // protected $hidden = ['password', 'remember_token'];
    // protected $casts = ['email_verified_at' => 'datetime'];

    // Many-to-many relationships
    // Link users with stations (intermediate table station_user)
    public function userStations()
    {
        return $this->belongsToMany(Station::class);
    }
    // Link users with videos (intermediate table user_video)
    public function userVideos()
    {
        return $this->belongsToMany(Video::class);
    }

    // Inverse one-to-many relationship
    // Link users with roles
    public function userRole()
    {
        return $this->belongsTo(Role::class);
    }
}
