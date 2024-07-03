<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUsuarioRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:255',
            'apellido_paterno' => 'required|string|max:255',
            'apellido_materno' => 'nullable|string|max:255',
            'nombre_contacto' => 'nullable|string|max:255',
            'telefono' => 'required|string|max:15',
            'curp' => 'required|string|size:18|unique:usuarios,curp',
            'rfc' => 'required|string|size:13|unique:usuarios,rfc',
            'correo' => 'required|string|email|max:255|unique:usuarios,correo',
        ];
    }
}