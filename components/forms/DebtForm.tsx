'use client';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import SubmitButton from '../SubmitButton';
import FormFields from '@/components/FormFields';
import { debtValidation } from '@/lib/validation';
import { createDebt } from '@/lib/actions/debt.actions';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const DebtForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();

  const form = useForm<z.infer<typeof debtValidation>>({
    resolver: zodResolver(debtValidation),
    defaultValues: {
      company: '',
      description: '',
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof debtValidation>) {
    setIsLoading(true);
    try {
      const resp = await createDebt({
        company: values.company,
        description: values.description,
        amount: values.amount,
        debt_date: date,
      });

      if (resp) {
        router.push('/dashboard/debts');
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
          name="company"
          placeholder="Enter company name...."
          label="Company"
        />
        <FormFields
          control={form.control}
          name="description"
          type="text"
          placeholder="Enter description...."
          label="Description"
        />
        <FormFields
          control={form.control}
          type="number"
          name="amount"
          placeholder="Enter amount...."
          label="Amount"
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

export default DebtForm;
