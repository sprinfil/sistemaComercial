<?php

use App\Http\Controllers\Api\AnomaliaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

//Route::post('/signup',[AuthController::class, "signup"]);
Route::post('/login',[AuthController::class, "login"]);

Route::middleware('auth:sanctum')->group(function(){

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post("/logout", [AuthController::class, "logout"]);

    //CATALOGOS

});

Route::apiResource("/anomalia", AnomaliaController::class);