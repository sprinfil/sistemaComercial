<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AnomaliaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('anomalias')->insert([
            [
                'nombre' => 'Anomalia 1',
                'descripcion' => 'Descripción de la anomalia 1',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Anomalia 2',
                'descripcion' => 'Descripción de la anomalia 2',
                'estado' => 'inactivo',
            ],
            [
                'nombre' => 'Medidor Opaco',
                'descripcion' => 'No se ve el medidor',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'No existe medidor',
                'descripcion' => 'No hay medidor',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Perro Bravo',
                'descripcion' => 'El perro no permite la lectura del medidor',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Sin acceso al medidor',
                'descripcion' => 'No hay ningun medidor en la toma',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Sin acceso al medidor',
                'descripcion' => 'No hay ningun medidor en la toma',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Sin acceso al medidor',
                'descripcion' => 'No hay ningun medidor en la toma',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Sin acceso al medidor',
                'descripcion' => 'No hay ningun medidor en la toma',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Sin acceso al medidor',
                'descripcion' => 'No hay ningun medidor en la toma',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Sin acceso al medidor',
                'descripcion' => 'No hay ningun medidor en la toma',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Sin acceso al medidor',
                'descripcion' => 'No hay ningun medidor en la toma',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Sin acceso al medidor',
                'descripcion' => 'No hay ningun medidor en la toma',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Sin acceso al medidor',
                'descripcion' => 'No hay ningun medidor en la toma',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Sin acceso al medidor',
                'descripcion' => 'No hay ningun medidor en la toma',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Sin acceso al medidor',
                'descripcion' => 'No hay ningun medidor en la toma',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Sin acceso al medidor',
                'descripcion' => 'No hay ningun medidor en la toma',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Sin acceso al medidor',
                'descripcion' => 'No hay ningun medidor en la toma',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Sin acceso al medidor',
                'descripcion' => 'No hay ningun medidor en la toma',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Sin acceso al medidor',
                'descripcion' => 'No hay ningun medidor en la toma',
                'estado' => 'activo',
            ],
            
        ]);
    }
}
