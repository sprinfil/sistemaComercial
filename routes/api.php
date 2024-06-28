<?php

use App\Http\Controllers\Api\AjusteController;
use App\Http\Controllers\Api\AnomaliaController;
use App\Http\Controllers\Api\DescuentoCatalogoController;
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
});

//CATALOGOS----------------

//ANOMALIAS
Route::apiResource("/anomalias", AnomaliaController::class);

//USERS
Route::controller(UserController::class)->group(function () {
    Route::get("/users/{id}", "show");
});

//AJUSTES
Route::controller(AjusteController::class)->group(function () {
    Route::get("/Ajustes", "index");
    Route::post("/Ajustes/create", "store");
    Route::put("/Ajustes/update/{id}", "update");

    //log delete significa borrado logico
    Route::put("/Ajustes/log_delete/{id}", "destroy");
});

//DESCUENTOS
Route::controller(DescuentoCatalogoController::class)->group(function () {
    Route::get("/descuentos", "index");
    Route::post("/descuentos/create", "store");
    Route::put("/descuentos/update/{id}", "update");

    //log delete significa borrado logico
    Route::put("/descuentos/log_delete/{id}", "destroy");
});

