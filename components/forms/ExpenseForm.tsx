'use client';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { Form } from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { createExpense1 } from '@/lib/actions/expense.actions';
import { expenseValidation } from '@/lib/validation';

import SubmitButton from '../SubmitButton';
import FormFields from '@/components/FormFields';
import { format } from 'date-fns';

const ExpenseForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const form = useForm<z.infer<typeof expenseValidation>>({
    resolver: zodResolver(expenseValidation),
    defaultValues: {
      fuel: 0,
      shaxaad: 0,
      waterLaydh: 0,
      internet: 0,
      salary: 0,
      expenses: 0,
      description: '',
      netIncome: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof expenseValidation>) {
    setIsLoading(true);
    try {
      const {
        fuel,
        shaxaad,
        waterLaydh,
        internet,
        salary,
        expenses,
        description,
      } = values;
      const total1 = fuel + waterLaydh + internet + shaxaad + expenses + salary;

      const expenseData = await createExpense1({
        fuel: fuel,
        shaxaad: shaxaad,
        waterLayadh: waterLaydh,
        internet: internet,
        salary: salary,
        expenses: expenses,
        description: description,
        expense_date: date,
        total: total1,
        netIncome: total1,
      });

      if (expenseData) {
        router.push('/dashboard/expense');

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
        <div className="flex gap-2 w-[400px]">
          <FormFields
            control={form.control}
            type="number"
            name="fuel"
            label="Shidaal:"
            placeholder="Enter amount..."
          />
          <FormFields
            control={form.control}
            type="number"
            name="shaxaad"
            label="Shaxaad:"
            placeholder="Shaxaad..."
          />
        </div>
        <div className="flex gap-2 w-[400px]">
          <FormFields
            control={form.control}
            type="number"
            name="waterLaydh"
            label="Biyo & Laydh:"
            placeholder="Enter amount..."
          />
          <FormFields
            control={form.control}
            type="number"
            name="internet"
            label="Internet:"
            placeholder="Enter amount..."
          />
        </div>

        <div className="flex gap-2 w-[400px]">
          <FormFields
            control={form.control}
            type="number"
            name="salary"
            label="Salary:"
            placeholder="Enter Salary..."
          />
          <FormFields
            control={form.control}
            type="number"
            name="expenses"
            label="Expenses:"
            placeholder="Enter Expenses..."
          />
        </div>

        <FormFields
          control={form.control}
          type="text"
          name="description"
          label="Description:"
          placeholder="Enter description..."
        />
        <div className="mt-7">
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

export default ExpenseForm;
