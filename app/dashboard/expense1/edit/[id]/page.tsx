'use client';
import { useState, useEffect } from 'react';
import EditExpense2 from '@/components/forms/EditExpense2';
import { getExpense2ById } from '@/lib/actions/expense.actions';
const EditExpense2Page = ({ params }: any) => {
  const [form, setForm] = useState<any>({
    total: 0,
    oil: 0,
    dayactir: 0,
    spareParts: 0,
    smallExpense: 0,
    description: '',
    salary: 0,
  });

  useEffect(() => {
    const fetchById = async () => {
      const resp: any = await getExpense2ById(params.id);
      setForm({
        total: resp.total,
        oil: resp.oil,
        dayactir: resp.dayactir,
        spareParts: resp.spareParts,
        smallExpense: resp.smallExpense,
        description: resp.description,
        salary: resp.salary,
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
        <p className="text-gray-400 font-normal">Expenses1 form editing.</p>
      </div>
      <EditExpense2 id={params.id} form={form} setForm={setForm} />
    </div>
  );
};

export default EditExpense2Page;
