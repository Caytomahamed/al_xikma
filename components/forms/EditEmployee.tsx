'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SubmitButton from '../SubmitButton';

import { editEmployee } from '@/lib/actions/employee.actions';
interface EditProps {
  id: string;
  form: any;
  setForm: (form: string) => void;
}
const EditEmployee = ({ id, form, setForm }: EditProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    let name: string = e.target.name;
    let value: string = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const result: any = await editEmployee(id, {
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        createdAt: new Date(),
      });
      if (result) {
        console.log(result);
        router.push('/dashboard/employee');
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="fullName">Employee Name:</Label>
        <Input
          type="text"
          name="fullName"
          placeholder="Edit Employee Name"
          value={form.fullName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Employee Email:</Label>
        <Input
          type="text"
          name="email"
          placeholder="Edit Employee Email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Employee Phone:</Label>
        <Input
          type="text"
          name="phone"
          placeholder="Edit Employee Phone"
          value={form.phone}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="address">Employee Address:</Label>
        <Input
          type="text"
          name="address"
          placeholder="Edit Employee Address"
          value={form?.address}
          onChange={handleChange}
        />
      </div>
      <SubmitButton isLoading={isLoading}>Edit</SubmitButton>
    </form>
  );
};

export default EditEmployee;
