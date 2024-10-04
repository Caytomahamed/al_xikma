'use client';
import React, { useState, useEffect } from 'react';
import CraneTable from '@/components/CraneTable';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import {
  getCrane1,
  getCrane2,
  getCrane3,
  deleteCrane1,
  deleteCrane2,
  deleteCrane3,
} from '@/lib/actions/crane.actions';
interface Crane {
  id: string;
  customer: string;
  description: string;
  price: number;
  receipt_no: string;
  createdAt: Date;
  updatedAt: Date; // Note: it's `updatedAt` not `updateAt`
}

const Crane = ({ params }: { params: any }) => {
  const [data, setData] = useState<Crane[]>([]);

  useEffect(() => {
    if (params.id === '1') {
      const fetchData = async () => {
        const crane: any = await getCrane1();

        setData(crane);
      };

      fetchData();
    } else if (params.id === '2') {
      const fetchData = async () => {
        const crane: any = await getCrane2();

        setData(crane);
      };

      fetchData();
    } else {
      const fetchData = async () => {
        const crane: any = await getCrane3();

        setData(crane);
      };

      fetchData();
    }
  }, [params.id]);

  const handleDelete = async (craneId: string) => {
    let resp: any;
    if (params.id === '1') {
      resp = await deleteCrane1(craneId);
      console.log(resp);
    } else if (params.id === '2') {
      resp = await deleteCrane2(craneId);
      console.log(resp);
    } else {
      resp = await deleteCrane3(craneId);
      console.log(resp);
    }
  };
  return (
    <div className="space-y-4">
      <h2 className="text-slate-800 font-semibold text-2xl">
        Crane:{params.id}
      </h2>

      <Link
        className="bg-[#395CA0] rounded-md text-white text-base font-semibold py-4 px-2 w-[100px] flex items-center  gap-2"
        href={`/dashboard/crane/${params.id}/add`}
      >
        <FaPlus className="text-white" />
        Create
      </Link>

      <CraneTable handleDelete={handleDelete} data={data} id={params.id} />
    </div>
  );
};

export default Crane;
