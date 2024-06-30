<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AnomaliaCatalogo;
use App\Http\Requests\StoreAnomaliaCatalogoRequest;
use App\Http\Requests\UpdateAnomaliaCatalogoRequest;
use App\Http\Resources\AnomaliaCatalogoResource;
use Illuminate\Http\Request;

class AnomaliaCatalagoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AnomaliaCatalogoResource::collection(
            AnomaliaCatalogo::all()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnomaliaCatalogoRequest $request)
    {
        $data = $request->validated();
        $anomalia = AnomaliaCatalogo::create($data);
        return response(new AnomaliaCatalogoResource($anomalia), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(AnomaliaCatalogo $anomaliaCatalogo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnomaliaCatalogoRequest $request, AnomaliaCatalogo $anomaliaCatalogo)
    {
        $data = $request->validated();
        $anomalia = AnomaliaCatalogo::find($request["id"]);
        $anomalia->update($data);
        $anomalia->save();
        return new AnomaliaCatalogoResource($anomalia);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AnomaliaCatalogo $anomaliaCatalogo, Request $request)
    {
        $anomalia = AnomaliaCatalogo::find($request["id"]);
        $anomalia->delete();
    }
}
