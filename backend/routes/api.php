<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;

Route::post('/restaurants', [RestaurantController::class, 'store']);
