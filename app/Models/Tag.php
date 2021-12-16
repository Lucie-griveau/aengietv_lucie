<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected array $fillable = ['tag'];

    // One-to-many relationship
    // Link tags with videos
    public function videos()
    {
        return $this->hasMany(Video::class);
    }
}
