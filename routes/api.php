<?php

use App\Http\Controllers\Api\AjusteCatalagoController;
use App\Http\Controllers\Api\AnomaliaCatalagoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;

//Route::post('/signup',[AuthController::class, "signup"]);
Route::post('/login', [AuthController::class, "login"]);

//AQUI VAN TODAS LAS RUTAS
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post("/logout", [AuthController::class, "logout"]);
    //CATALOGOS----------------

    //ANOMALIAS
    Route::controller(AnomaliaCatalagoController::class)->group(function () {
        Route::get("/AnomaliasCatalogo", "index");
        Route::post("/AnomaliasCatalogo/create", "store");
        Route::put("/AnomaliasCatalogo/update/{id}", "update");

        Route::put("/AnomaliasCatalogo/log_delete/{id}", "destroy");
    });

    //USERS
    Route::controller(UserController::class)->group(function () {
        Route::get("/users/{id}", "show");
    });

    //AJUSTES
    Route::controller(AjusteCatalagoController::class)->group(function () {
        Route::get("/AjustesCatalogo", "index");
        Route::post("/AjustesCatalogo/create", "store");
        Route::put("/AjustesCatalogo/update/{id}", "update");

        //log delete significa borrado logico
        Route::put("/AjustesCatalogo/log_delete/{id}", "destroy");
    });

});

