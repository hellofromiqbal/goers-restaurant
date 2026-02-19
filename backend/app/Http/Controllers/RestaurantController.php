<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRestaurantRequest;
use App\Models\Restaurant;

class RestaurantController extends Controller
{
    public function store(StoreRestaurantRequest $request)
    {
        $restaurant = Restaurant::create($request->validated());

        return response()->json($restaurant);
    }
}
