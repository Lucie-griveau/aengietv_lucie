<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'argument_id',
        'SO_id',
        'CM_id',
        'SM_id',
        'accent_color',
        'description',
        'showreel',
        'slug',
        'logo',
        'event_latitude',
        'event_longitude',
        'event_date' ];

    // Many-to-many relationships
    // Link stations with users (intermediate table station_user)
    public function stationUsers()
    {
        return $this->belongsToMany(User::class);
    }
    // Link stations with videos (intermediate table station_video)
    public function stationVideos()
    {
        return $this->belongsToMany(Video::class);
    }

    // Inverse one-to-many relationship
    // Link stations with arguments
    public function stationArgument()
    {
        return $this->belongsTo(Argument::class);
    }
}
