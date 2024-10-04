'use client';
import { useState, useEffect } from 'react';
import EditCrane from '@/components/forms/EditCrane';
import {
  getCrane1ById,
  getCrane2ById,
  getCrane3ById,
} from '@/lib/actions/crane.actions';

const EditCranePage = ({ params }: any) => {
  const [form, setForm] = useState<any>({
    customer: '',
    description: '',
    price: 0,
    receipt_no: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      let resp: any;
      if (params.id === '1') {
        resp = await getCrane1ById(params.crane);
        setForm({
          customer: resp?.customer,
          description: resp?.description,
          price: resp?.price,
          receipt_no: resp?.receipt_no,
        });
      } else if (params.id === '2') {
        resp = await getCrane2ById(params.crane);
        setForm({
          customer: resp?.customer,
          description: resp?.description,
          price: resp?.price,
          receipt_no: resp?.receipt_no,
        });
      } else {
        resp = await getCrane3ById(params.crane);
        setForm({
          customer: resp?.customer,
          description: resp?.description,
          price: resp?.price,
          receipt_no: resp?.receipt_no,
        });
      }
    };
    fetchData();
  }, [params.crane, params.id]);
  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="space-y-2">
        <h2 className="text-xl text-slate-700 font-semibold">
          Complete The Form
        </h2>
        <p className="text-gray-400 font-normal">Crane form editing.</p>
      </div>
      <EditCrane
        craneId={params.crane}
        id={params.id}
        form={form}
        setForm={setForm}
      />
    </div>
  );
};

export default EditCranePage;
