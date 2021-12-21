<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [ 'title', 'description', 'url', 'poster', 'user_id', 'station_id', 'is_published', 'publication_date', 'upload_date', 'duration', 'is_showreel', 'category_id', 'status_id', 'tag_id'];

    public function videoUsers(){
        return $this->belongsToMany(User::class);
    }

    public function videoStations(){
        return $this->belongsToMany(Station::class);
    }

    public function videoStatus(){
        return $this->belongsTo(Status::class);
    }
    public function videoTags(){
        return $this->belongsTo(Tag::class);
    }
}

