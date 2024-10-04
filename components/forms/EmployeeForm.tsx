'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormFields from '@/components/FormFields';
import { Form } from '@/components/ui/form';
import { employeeValidation } from '@/lib/validation';
import { useState } from 'react';
import SubmitButton from '../SubmitButton';
import { createEmployee } from '@/lib/actions/employee.actions';
import { useRouter } from 'next/navigation';

const EmployeeForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof employeeValidation>>({
    resolver: zodResolver(employeeValidation),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      phone: '',
    },
  });

  async function onSubmit(values: z.infer<typeof employeeValidation>) {
    setIsLoading(true);
    const employee = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
    };
    try {
      const employeeData = await createEmployee(employee);
      if (employeeData) {
        router.push('/dashboard/employee');
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormFields
          control={form.control}
          type="text"
          name="name"
          label="FullName:"
          placeholder="Enter Employee Name"
        />
        <FormFields
          control={form.control}
          type="email"
          name="email"
          label="Email:"
          placeholder="Enter Employee Email"
        />
        <FormFields
          control={form.control}
          type="text"
          name="phone"
          label="Phone:"
          placeholder="Enter Employee Phone"
        />
        <FormFields
          control={form.control}
          type="text"
          name="address"
          label="Address:"
          placeholder="Enter Employee Address"
        />

        <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
      </form>
    </Form>
  );
};

export default EmployeeForm;
