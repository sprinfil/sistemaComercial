import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, Anomalia } from "../../../components/Tables/Columns/AnomaliasColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextAnomalias.tsx';
import Loader from '../../ui/Loader.tsx';

export default function AnomaliaTable() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Anomalia[]>([]);

  useEffect(() => {
    getAnomalias();
  }, []);

  const getAnomalias = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/anomalia");
      setLoading(false);
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch anomalias:", error);
    }
  };

  if (loading) {
    return <div><Loader/></div>;
  }

  return (
    <div>
      <DataTable columns={columns} data={data} sorter='nombre' />
    </div>
  );
}