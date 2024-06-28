<?php

namespace App\Http\Controllers\Api;

use App\Models\Anomalia;
use App\Http\Controllers\Controller;
use App\Http\Resources\AnomaliaResource;
use App\Http\Requests\StoreAnomaliaRequest;
use App\Http\Requests\UpdateAnomaliaRequest;
use Illuminate\Http\Request;




class AnomaliaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AnomaliaResource::collection(
            Anomalia::orderby("id", "desc")->where("estado", "activo")->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnomaliaRequest $request)
    {
        $data = $request->validated();
        $anomalia = Anomalia::create($data);
        return response(new AnomaliaResource($anomalia), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Anomalia $anomalia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnomaliaRequest $request, Anomalia $anomalia)
    {
        $data = $request->validated();
        $anomalia = Anomalia::find($request["id"]);
        $anomalia->update($data);
        $anomalia->save();
        return new AnomaliaResource($anomalia);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Anomalia $anomalia, Request $request)
    {
        $anomalia = Anomalia::find($request["id"]);
        $anomalia->estado = "inactivo";
        $anomalia->save();
        return response("",201);
    }
}
