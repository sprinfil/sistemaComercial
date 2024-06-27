<?php

use App\Http\Controllers\Api\AnomaliaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;

//Route::post('/signup',[AuthController::class, "signup"]);
Route::post('/login', [AuthController::class, "login"]);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post("/logout", [AuthController::class, "logout"]);
});

//CATALOGOS

//ANOMALIAS
Route::apiResource("/anomalias", AnomaliaController::class);

Route::controller(UserController::class)->group(function () {
    Route::get("/users/{id}", "show");
});
