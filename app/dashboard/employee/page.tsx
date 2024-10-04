'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import CustomTable from '@/components/CustomTable';
import { getAllEmployee, deleteEmployee } from '@/lib/actions/employee.actions';

interface EmployeeData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}
const Employee = () => {
  const [data, setData] = useState<EmployeeData[]>([]);
  const tableHead = {
    fullName: 'FullName',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
  };

  const fetchData = async () => {
    const resp: any = await getAllEmployee();

    if (resp) {
      setData(resp);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await deleteEmployee(id);

    if (result) {
      return fetchData();
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-slate-800 font-semibold text-2xl">Employee</h2>
      <Link
        className="bg-[#395CA0] rounded-md text-white text-base font-semibold py-4 px-2 w-[100px] flex items-center  gap-2"
        href="/dashboard/employee/add"
      >
        <FaPlus className="text-white" />
        Create
      </Link>

      <CustomTable handleDelete={handleDelete} data={data} head={tableHead} />
    </div>
  );
};

export default Employee;
