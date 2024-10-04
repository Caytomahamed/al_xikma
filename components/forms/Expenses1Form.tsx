'use client';
import { format } from 'date-fns';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import FormFields from '../FormFields';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

import { createExpense2 } from '@/lib/actions/expense.actions';
import { expense1Validation } from '@/lib/validation';

import SubmitButton from '../SubmitButton';
const Expenses1Form = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();

  const form = useForm<z.infer<typeof expense1Validation>>({
    resolver: zodResolver(expense1Validation),
    defaultValues: {
      oil: 0,
      dayactir: 0,
      spareParts: 0,
      smallExpense: 0,
      description: '',
      netTotal: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof expense1Validation>) {
    setIsLoading(true);
    try {
      const { oil, dayactir, spareParts, smallExpense, description } = values;
      const addition = oil + dayactir + spareParts + smallExpense;
      const expense = await createExpense2({
        oil: oil,
        dayactir: dayactir,
        spareParts: spareParts,
        smallExpense: smallExpense,
        description: description,
        expense_date: date,
        netTotal: addition,
      });

      if (expense) {
        router.push('/dashboard/expense1');
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
          type="number"
          name="oil"
          label="Saliid"
          placeholder="Saliid"
        />
        <FormFields
          control={form.control}
          type="number"
          name="dayactir"
          label="Dayactir"
          placeholder="Dayactir..."
        />
        <FormFields
          control={form.control}
          type="number"
          name="spareParts"
          label="Spare Parts"
          placeholder="Spare Parts..."
        />
        <FormFields
          control={form.control}
          type="number"
          name="smallExpense"
          label="Kharash Yar"
          placeholder="Kharash Yar..."
        />
        <FormFields
          control={form.control}
          type="text"
          name="description"
          label="Description"
          placeholder="Enter Description..."
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

export default Expenses1Form;
