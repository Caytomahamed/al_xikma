'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import DebtTable from '@/components/DebtTable';
import { getAllDebt, deleteDebt } from '@/lib/actions/debt.actions';
const DebtPage = () => {
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    try {
      const resp: any = await getAllDebt();
      if (!resp) return;
      setData(resp);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const resp = await deleteDebt(id);
      if (resp) {
        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-slate-800 font-semibold text-2xl">Debts</h2>
      <Link
        className="bg-[#395CA0] rounded-md text-white text-base font-semibold py-4 px-2 w-[100px] flex items-center  gap-2"
        href="/dashboard/debts/add"
      >
        <FaPlus className="text-white" />
        Create
      </Link>

      <DebtTable handleDelete={handleDelete} data={data} />
    </div>
  );
};

export default DebtPage;
