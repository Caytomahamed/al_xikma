'use client';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import SubmitButton from '../SubmitButton';
import { updateDebt } from '@/lib/actions/debt.actions';
interface EditDebtProps {
  id: string;
  form: any;
  setForm: (form: any) => void;
}
const EditDebt = ({ id, form, setForm }: EditDebtProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();

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
  console.log(form);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await updateDebt(id, {
        company: form.company,
        description: form.description,
        amount: form.amount,
      });

      if (resp) {
        router.push('/dashboard/debts');
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="company">Company:</Label>
        <Input
          type="text"
          name="company"
          placeholder="Edit company name.."
          value={form.company}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description:</Label>
        <Input
          type="text"
          name="description"
          placeholder="Edit description name.."
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="amount">Amount:</Label>
        <Input
          type="number"
          name="amount"
          placeholder="Edit amount name.."
          value={form.amount}
          onChange={handleChange}
        />
      </div>
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
      <SubmitButton isLoading={isLoading}>Edit</SubmitButton>
    </form>
  );
};

export default EditDebt;
