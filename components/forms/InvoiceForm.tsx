'use client';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';

import { format } from 'date-fns';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';

import { craneValidation } from '@/lib/validation';
import SubmitButton from '../SubmitButton';
import FormFields from '@/components/FormFields';
import { createInvoice } from '@/lib/actions/invoice.actions';

const InvoiceForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const form = useForm<z.infer<typeof craneValidation>>({
    resolver: zodResolver(craneValidation),
    defaultValues: {
      customer: '',
      description: '',
      price: 0,
      receipt_no: '',
    },
  });
  async function onSubmit(values: z.infer<typeof craneValidation>) {
    setIsLoading(true);
    try {
      const invoice = await createInvoice({
        customer: values.customer,
        description: values.description,
        price: values.price,
        receipt_no: values.receipt_no,
        invoice_date: date,
      });

      if (invoice) {
        router.push(`/dashboard/invoice/${invoice.id}`);

        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormFields
          control={form.control}
          type="text"
          name="customer"
          label="Customer:"
          placeholder="Enter Customer Name"
        />
        <FormFields
          control={form.control}
          type="text"
          name="description"
          label="Description:"
          placeholder="Enter Description..."
        />
        <FormFields
          control={form.control}
          type="number"
          name="price"
          label="Xaddiga:"
          placeholder="Xaddiga Lacagta"
        />
        <FormFields
          control={form.control}
          type="text"
          name="receipt_no"
          label="Receipt No:"
          placeholder="Receipt No"
        />
        <div className="mt-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[280px] justify-start text-left font-normal',
                  !date && 'text-[#5874c7]'
                )}
              >
                <CalendarIcon className="mr-2 h-6 w-6" />
                {date ? (
                  format(date, 'MMM y')
                ) : (
                  <span className="font-medium">Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
      </form>
    </Form>
  );
};

export default InvoiceForm;
