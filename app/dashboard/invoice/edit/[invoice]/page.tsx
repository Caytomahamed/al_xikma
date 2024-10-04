'use client';
import { useState, useEffect } from 'react';
import EditInvoice from '@/components/forms/EditInvoice';
import { getInvoiceById } from '@/lib/actions/invoice.actions';
const EditInvoicePage = ({ params }: any) => {
  const [form, setForm] = useState<any>({
    customer: '',
    description: '',
    price: 0,
  });

  useEffect(() => {
    const fetchInvoiceById = async () => {
      const resp: any = await getInvoiceById(params.invoice);
      setForm({
        customer: resp.customer,
        description: resp.description,
        price: resp.price,
      });
    };

    fetchInvoiceById();
  }, [params.invoice]);

  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="space-y-2">
        <h2 className="text-xl text-slate-700 font-semibold">
          Complete The Form
        </h2>
        <p className="text-gray-400 font-normal">Invoice form editing.</p>
      </div>
      <EditInvoice id={params.invoice} form={form} setForm={setForm} />
    </div>
  );
};

export default EditInvoicePage;
