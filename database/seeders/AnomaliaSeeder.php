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
                'nombre' => 'Sin medidor',
                'descripcion' => 'Descripción de la anomalia 1',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Medidro opaco',
                'descripcion' => 'Descripción de la anomalia 2',
                'estado' => 'inactivo',
            ],
        ]);
    }
}
