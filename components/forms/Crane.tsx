'use client';
import { format } from 'date-fns';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
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
import {
  createCrane1,
  createCrane2,
  createCrane3,
} from '@/lib/actions/crane.actions';
import { craneValidation } from '@/lib/validation';
import FormFields from '@/components/FormFields';
import SubmitButton from '../SubmitButton';

const Crane = ({ id }: any) => {
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
      const { customer, description, price, receipt_no } = values;

      if (id === '1') {
        const data = await createCrane1({
          customer: customer,
          description: description,
          price: price,
          receipt_no: receipt_no,
          small_date: date,
        });
        if (data) {
          router.push(`/dashboard/crane/${id}`);
        }
        setIsLoading(false);
        console.log(data);
      } else if (id === '2') {
        const data = await createCrane2({
          customer: customer,
          description: description,
          price: price,
          receipt_no: receipt_no,
          middle_date: date,
        });

        setIsLoading(false);
        if (data) {
          router.push(`/dashboard/crane/${id}`);
        }
        console.log(data);
      } else {
        const data = await createCrane3({
          customer: customer,
          description: description,
          price: price,
          receipt_no: receipt_no,
          large_date: date,
        });

        setIsLoading(false);
        if (data) {
          router.push(`/dashboard/crane/${id}`);
        }
        console.log(data);
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
          label="Customer Name:"
          placeholder="Enter Customer Name"
        />
        <FormFields
          control={form.control}
          type="text"
          name="description"
          label="Description:"
          placeholder="Enter Description...."
        />
        <FormFields
          control={form.control}
          type="number"
          name="price"
          label="Price:"
          placeholder="Enter Price..."
        />
        <FormFields
          control={form.control}
          type="text"
          name="receipt_no"
          label="Receipt No:"
          placeholder="Enter Receipt No...."
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

export default Crane;
