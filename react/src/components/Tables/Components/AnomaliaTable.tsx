import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import {columns, Anomalia} from "../../../components/Tables/Columns/AnomaliasColumns.tsx";

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

export default function AnomaliaTable() {
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
    <div>
        <DataTable columns={columns} data={data} sorter='nombre'/>
    </div>
  );
}