'use client';
import { useState, useEffect } from 'react';
import EditSalary from '@/components/forms/EditSalary';
import { getSalaryById } from '@/lib/actions/salary.actions';
const SalaryEditPage = ({ params }: any) => {
  const [form, setForm] = useState<any>({
    amount: 0,
    horumarin: 0,
    total: 0,
    employeeId: '',
  });

  useEffect(() => {
    const fetchSalaryById = async () => {
      const resp: any = await getSalaryById(params.id);
      setForm({
        amount: resp.amount,
        horumarin: resp.horumarin,
        total: resp.total,
        employeeId: resp.employee?.id,
      });
    };

    fetchSalaryById();
  }, [params.id]);
  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="space-y-2">
        <h2 className="text-xl text-slate-700 font-semibold">
          Complete The Form
        </h2>
        <p className="text-gray-400 font-normal">Salary form editing.</p>
      </div>
      <EditSalary id={params.id} form={form} setForm={setForm} />
    </div>
  );
};

export default SalaryEditPage;
