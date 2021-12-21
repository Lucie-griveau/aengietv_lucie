<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Argument extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['argument','icon', 'slug'];

    // One-to-many relationship
    // Link arguments with stations
    public function stations()
    {
        return $this->hasMany(Station::class);
    }
}
