'use client';
import { useState, useEffect } from 'react';
import EditEmployee from '@/components/forms/EditEmployee';
import { getEmployee } from '@/lib/actions/employee.actions';
const EditEmployeePage = ({ params }: any) => {
  const [form, setForm] = useState<any>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const fetchEmployeeById = async () => {
      const employe: any = await getEmployee(params.id);
      setForm({
        fullName: employe?.name,
        email: employe.email,
        phone: employe.phone,
        address: employe.address,
      });
    };

    fetchEmployeeById();
  }, [params.id]);

  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="space-y-2">
        <h2 className="text-xl text-slate-700 font-semibold">
          Complete The Form
        </h2>
        <p className="text-gray-400 font-normal">employee form editing.</p>
      </div>

      <EditEmployee form={form} setForm={setForm} id={params.id} />
    </div>
  );
};

export default EditEmployeePage;
