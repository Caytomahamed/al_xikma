'use client';
import { Form } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import SubmitButton from '../SubmitButton';
import FormFields from '@/components/FormFields';
import { finalValidation } from '@/lib/validation';
import { createFinal } from '@/lib/actions/final.actions';

const FinalForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const router = useRouter();
  const form = useForm<z.infer<typeof finalValidation>>({
    resolver: zodResolver(finalValidation),
    defaultValues: {
      crane1: 0,
      crane2: 0,
      crane3: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof finalValidation>) {
    setIsLoading(true);
    try {
      const { crane1, crane2, crane3 } = values;
      const netTotal = crane1 + crane2 + crane3;
      const final = await createFinal({
        crane1: crane1,
        crane2: crane2,
        crane3: crane3,
        sales_date: date,
        total: netTotal,
      });
      if (final) {
        router.push('/dashboard/expense/add');
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
          type="number"
          name="crane1"
          label="crane 25t"
          placeholder="Enter Crane 20t Total"
        />
        <FormFields
          control={form.control}
          type="number"
          name="crane2"
          label="crane 60t"
          placeholder="Enter Crane 60t Total"
        />
        <FormFields
          control={form.control}
          type="number"
          name="crane3"
          label="crane 160t"
          placeholder="Enter Crane 160t Total"
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

export default FinalForm;
