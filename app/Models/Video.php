<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'title',
        'description',
        'url',
        'poster',
        'duration',
        'is_published',
        'publication_date',
        'upload_date',
        'is_showreel',
        'user_id',
        'station_id',
        'status_id',
        'tag_id'];

    // Many-to-many relationships
    // Link videos with users (intermediate table user_video)
    public function videoUsers()
    {
        return $this->belongsToMany(User::class);
    }
    // Link videos with stations (intermediate table station_video)
    public function videoStations()
    {
        return $this->belongsToMany(Station::class);
    }

    // Inverse one-to-many relationship
    // Link videos with status
    public function videoStatus()
    {
        return $this->belongsTo(Status::class);
    }
    // Link videos with tags
    public function videoTags()
    {
        return $this->belongsTo(Tag::class);
    }
    // Link videos with playlists
    // public function videoPlaylists()
    // {
    //     return $this->belongsTo(Playlist::class);
    // }
}
