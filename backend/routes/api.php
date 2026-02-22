<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/restaurants', [RestaurantController::class, 'index']);
Route::get('/restaurants/{id}', [RestaurantController::class, 'show']);
Route::middleware('auth:sanctum')->group(function() {
  Route::post('/restaurants', [RestaurantController::class, 'store']);
  Route::delete('/restaurants/{id}', [RestaurantController::class, 'destroy']);
});