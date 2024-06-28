<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DescuentoCatalogo;
use App\Http\Requests\StoreDescuentoCatalogoRequest;
use App\Http\Requests\UpdateDescuentoCatalogoRequest;
use App\Http\Resources\DescuentoCatalogoResource;

class DescuentoCatalogoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DescuentoCatalogoResource::collection(
            DescuentoCatalogo::orderby("id", "desc")->where("estado", "activo")->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDescuentoCatalogoRequest $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(DescuentoCatalogo $descuentoCatalogo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDescuentoCatalogoRequest $request, DescuentoCatalogo $descuentoCatalogo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DescuentoCatalogo $descuentoCatalogo)
    {
        //
    }
}
