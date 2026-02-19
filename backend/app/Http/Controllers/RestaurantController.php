<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreRestaurantRequest;
use App\Models\Restaurant;

class RestaurantController extends Controller
{
    public function index()
    {
        $restaurants = Restaurant::with('hours')->get();

        return response()->json($restaurants);
    }
    
    public function store(StoreRestaurantRequest $request)
    {
        $validated = $request->validated();

        $restaurant = DB::transaction(function () use ($validated) {
            $restaurant = Restaurant::create([
                'name' => $validated['name']
            ]);
            
            foreach ($validated['hours'] as $hour) {
                $restaurant->hours()->create([
                    'day_of_week' => $hour['day_of_week'],
                    'open_time' => $hour['open_time'],
                    'close_time' => $hour['close_time']
                ]);
            }

            return $restaurant->load('hours');
        });

        return response()->json($restaurant);
    }
}
