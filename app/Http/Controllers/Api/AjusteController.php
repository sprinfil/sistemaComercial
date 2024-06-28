<?php

namespace App\Http\Controllers\Api;

use App\Models\Ajuste;
use App\Http\Controllers\Controller;
use App\Http\Resources\AnomaliaResource;
use App\Http\Requests\StoreAjusteRequest;
use App\Http\Requests\UpdateAjusteRequest;
use App\Http\Resources\AjusteResource;
use Illuminate\Http\Request;

class AjusteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AjusteResource::collection(
            Ajuste::orderby("id", "desc")->where("estado","activo")->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAjusteRequest $request)
    {
        $data = $request->validated();
        $ajuste = Ajuste::create($data);
        return response(new AjusteResource($ajuste), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ajuste $ajuste)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAjusteRequest $request, Ajuste $ajuste)
    {
        $data = $request->validated();
        $ajuste = Ajuste::find($request["id"]);
        $ajuste->update($data);
        $ajuste->save();
        return new AjusteResource($ajuste);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $ajuste = Ajuste::find($request["id"]);
        $ajuste->estado = "inactivo";
        $ajuste->save();
        return response(new AjusteResource($ajuste),201);
    }
}
