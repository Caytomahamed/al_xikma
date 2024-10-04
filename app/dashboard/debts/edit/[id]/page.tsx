'use client';
import { useState, useEffect } from 'react';
import { getDebtById } from '@/lib/actions/debt.actions';
import EditDebt from '@/components/forms/EditDebt';
const EditDebtPage = ({ params }: any) => {
  const [form, setForm] = useState<any>({
    company: '',
    description: '',
    amount: 0,
  });

  useEffect(() => {
    const fetchById = async () => {
      const resp: any = await getDebtById(params.id);
      setForm({
        company: resp.company,
        description: resp.description,
        amount: resp.amount,
      });
    };

    fetchById();
  }, [params.id]);
  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="space-y-2">
        <h2 className="text-xl text-slate-700 font-semibold">
          Complete The Form
        </h2>
        <p className="text-gray-400 font-normal">debt form editing.</p>
      </div>

      <EditDebt form={form} setForm={setForm} id={params.id} />
    </div>
  );
};

export default EditDebtPage;
