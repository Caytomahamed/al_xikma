'use client';
import { useState, useEffect } from 'react';
import { getMonthExpenseById } from '@/lib/actions/month.actions';
import EditForm from '@/components/forms/EditMonthExpense';
const EditMonthExpense = ({ params }: any) => {
  const [form, setForm] = useState({
    salary: 0,
    feePercentage: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchById = async () => {
      const resp: any = await getMonthExpenseById(params.id);
      setForm({
        feePercentage: resp.feePercentage,
        salary: resp.salary,
      });
    };

    fetchById();
  }, [params.id]);
  return (
    <div className="flex flex-col gap-6 px-4">
      <div className="space-y-2">
        <h2 className="text-xl text-slate-700 font-semibold">
          Complete The Form
        </h2>
        <p className="text-gray-400 font-normal">form editing.</p>
      </div>

      <EditForm
        id={params.id}
        setForm={setForm}
        form={form}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default EditMonthExpense;
