<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $fillable = [
        'name'
    ];

    public function hours()
    {
        return $this->hasMany(RestaurantHour::class);
    }
}
