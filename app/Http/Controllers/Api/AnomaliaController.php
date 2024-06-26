<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Anomalia;
use App\Http\Requests\StoreAnomaliaRequest;
use App\Http\Requests\UpdateAnomaliaRequest;
use App\Http\Resources\AnomaliaResource;

class AnomaliaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AnomaliaResource::collection(
            Anomalia::all()
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Anomalia $anomalia)
    {
        //
    }
}
