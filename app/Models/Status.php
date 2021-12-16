<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['status', 'image'];

    // One-to-many relationship
    // Link status with videos
    public function videos()
    {
        return $this->hasMany(Video::class);
    }
}
