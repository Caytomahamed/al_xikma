'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import SubmitButton from '../SubmitButton';
import { updateSalary } from '@/lib/actions/salary.actions';
interface EditSalaryProps {
  id: string;
  form: any;
  setForm: (form: any) => void;
}
const EditSalary = ({ id, form, setForm }: EditSalaryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const router = useRouter();

  const handleChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.valueAsNumber;

    setForm({
      ...form,
      [name]: value,
    });
  };
  const netTotal = form.amount - form.horumarin;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const resp = await updateSalary(id, {
        amount: form.amount,
        horumarin: form.horumarin,
        salary_date: date,
        total: netTotal,
        employeeId: form.employeeId,
      });

      if (resp) {
        router.push('/dashboard/salary');
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        <Label htmlFor="total">Mushahar:</Label>
        <Input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="horumarin">Horumarin:</Label>
        <Input
          type="number"
          name="horumarin"
          value={form.horumarin}
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
      <div>
        <Label htmlFor="total">Total:</Label>
        <Input
          type="number"
          name="total"
          value={form.total}
          onChange={handleChange}
        />
      </div>

      <SubmitButton isLoading={isLoading}>Edit</SubmitButton>
    </form>
  );
};

export default EditSalary;
