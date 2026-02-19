<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreRestaurantRequest;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function index(Request $request)
    {
        $query = Restaurant::with('hours');

        if ($request->name) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->day || $request->time) {

            $query->whereHas('hours', function ($q) use ($request) {

                if ($request->day !== null) {
                    $q->where('day_of_week', $request->day);
                }

                if ($request->time) {
                    $q->where('open_time', '<=', $request->time)
                    ->where('close_time', '>=', $request->time);
                }

            });

        }

        return response()->json($query->get());
    }

    public function show($id)
    {
        $restaurant = Restaurant::with('hours')->findOrFail($id);

        return response()->json($restaurant);
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
