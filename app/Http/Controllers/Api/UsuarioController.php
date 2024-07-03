<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use App\Http\Requests\StoreUsuarioRequest;
use App\Http\Requests\UpdateUsuarioRequest;
use App\Http\Resources\UsuarioResource;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UsuarioResource::collection(
            Usuario::all()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUsuarioRequest $request, string $tipo)
    {
        $data=$request->validated();
        $usuario=Usuario::create($data);
        return response(new UsuarioResource($usuario),201);
    }
    public function storeMoral(StoreUsuarioRequest $request, string $tipo)
    {
        $data=$request->validated();
        $usuario=Usuario::create($data);
        return response(new UsuarioResource($usuario),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Usuario $usuario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUsuarioRequest $request)
    {
        $data=$request->validated();
        $usuario=Usuario::find($request['id']);
        $usuario->update();
        $usuario->save();
        return new UsuarioResource($usuario);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Usuario $usuario, Request $request)
    {
        try
        {
            $usuario = Usuario::findOrFail($request["id"]);
            $usuario->delete();
            return response()->json(['message' => 'Eliminado correctamente'], 200);
        }
        catch (\Exception $e) {

            return response()->json(['message' => 'Algo fallo'], 500);
        }
    }
}
