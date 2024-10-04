'use client';
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import SubmitButton from '../SubmitButton';
import {
  updateCrane1,
  updateCrane2,
  updateCrane3,
} from '@/lib/actions/crane.actions';
interface EditCraneProps {
  id: string;
  craneId: string;
  form: any;
  setForm: (form: any) => void;
}
const EditCrane = ({ id, form, setForm, craneId }: EditCraneProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: any) => {
    let value: string | number = e.target.value;
    let name: string = e.target.name;
    let type: string = e.target.type;

    if (type === 'number') {
      value = e.target.valueAsNumber;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let resp: any;
      setIsLoading(true);
      if (id === '1') {
        resp = await updateCrane1(craneId, {
          customer: form.customer,
          description: form.description,
          price: form.price,
          receipt_no: form.receipt_no,
        });

        if (resp) {
          router.push('/dashboard/crane/1');
          setIsLoading(false);
        }
      } else if (id === '2') {
        resp = await updateCrane2(craneId, {
          customer: form.customer,
          description: form.description,
          price: form.price,
          receipt_no: form.receipt_no,
        });
        if (resp) {
          router.push('/dashboard/crane/2');
          setIsLoading(false);
        }
      } else {
        resp = await updateCrane3(craneId, {
          customer: form.customer,
          description: form.description,
          price: form.price,
          receipt_no: form.receipt_no,
        });

        if (resp) {
          router.push('/dashboard/crane/3');
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="customer">Customer:</Label>
        <Input
          name="customer"
          type="text"
          placeholder="Edit Customer"
          value={form.customer}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description:</Label>
        <Input
          name="description"
          type="text"
          placeholder="Edit Description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Price:</Label>
        <Input
          name="price"
          type="number"
          placeholder="Edit Price"
          value={form.price}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Receipt No:</Label>
        <Input
          name="receipt_no"
          type="text"
          placeholder="Edit Receipt No"
          value={form.receipt_no}
          onChange={handleChange}
        />
      </div>
      <SubmitButton isLoading={isLoading}>Edit</SubmitButton>
    </form>
  );
};

export default EditCrane;
