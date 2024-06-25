import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import {columns, Anomalia} from "../../../Columns/AnomaliasColumns.tsx";


async function getData(): Promise<Anomalia[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      nombre: "Perro Bravo",
      estado: "activo",
      descripcion: "el operador no puede acceder al medidor por el perro",
    },
    {
      id: "728ed52f",
      nombre: "No Existe Medidor",
      estado: "activo",
      descripcion: "el operador no puede acceder al medidor por el perro",
    },
    {
      id: "728ed52f",
      nombre: "Sin acceso al medidor",
      estado: "activo",
      descripcion: "el operador no puede acceder al medidor por el perro",
    },
    {
      id: "728ed52f",
      nombre: "Medidor Opaco",
      estado: "activo",
      descripcion: "el operador no puede acceder al medidor por el perro",
    },
  ];
}

export default function Anomalias() {
  const [data, setData] = useState<Anomalia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full max-h-[75vh]'>
      {/*Contenedor principal*/}
      <div className='flex gap-2  overflow-auto'>
        {/*Datatable*/}
        <div className='w-[35%] rounded-md border border-border p-4  overflow-auto h-[75vh]'>
          <DataTable columns={columns} data={data} sorter='nombre'/>
        </div>

        {/*Formulario*/}
        <div className='w-[65%] rounded-md border border-border h-[75vh]'>
          {/* Form content goes here */}
        </div>
      </div>
    </div>
  );
}