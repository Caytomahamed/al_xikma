'use client';
import { format } from 'date-fns';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import SubmitButton from '../SubmitButton';
import { updateExpense1 } from '@/lib/actions/expense.actions';
interface EditExpense1Props {
  id: string;
  form: any;
  setForm: (form: any) => void;
}
const EditExpense1 = ({ id, form, setForm }: EditExpense1Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();

  const handleChange = (e: any) => {
    let name: string = e.target.name;
    let value: string | number = e.target.value;
    let type: string = e.target.type;
    if (type === 'number') {
      value = e.target.valueAsNumber;
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const {
      fuel,
      shaxaad,
      internet,
      waterLaydh,
      salary,
      expenses,
      description,
      income,
    } = form;
    const total = fuel + shaxaad + internet + waterLaydh + salary + expenses;

    setIsLoading(true);

    try {
      const resp = await updateExpense1(id, {
        income: income,
        fuel: fuel,
        shaxaad: shaxaad,
        internet: internet,
        waterLayadh: waterLaydh,
        salary: salary,
        expenses: expenses,
        description: description,
        expense_date: date,
        netIncome: total,
      });
      if (resp) {
        router.push('/dashboard/expense');
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="">Dakhali:</Label>
        <Input
          type="number"
          min="0"
          max="999999"
          name="income"
          value={form.amount}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="">Shidaal:</Label>
        <Input
          type="number"
          min="0"
          max="999999"
          name="fuel"
          value={form.fuel}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="">Internet:</Label>
        <Input
          type="number"
          min="0"
          max="999999"
          name="fuel"
          value={form.internet}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="">Biyo Iyo Laydh:</Label>
        <Input
          type="number"
          min="0"
          max="999999"
          name="fuel"
          value={form.waterLaydh}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="">Shaxaad:</Label>
        <Input
          type="number"
          min="0"
          max="999999"
          name="shaxaad"
          value={form.shaxaad}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="">Salary:</Label>
        <Input
          type="number"
          min="0"
          max="999999"
          name="salary"
          value={form.salary}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="">Expenses:</Label>
        <Input
          type="number"
          min="0"
          max="999999"
          name="expenses"
          value={form.expenses}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="">Description:</Label>
        <Input
          type="text"
          name="description"
          placeholder="Update Description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="">Khidmada:</Label>
        <Input
          type="number"
          min="0"
          max="999999"
          name="feePercentage"
          value={form.feePercentage}
          onChange={handleChange}
        />
      </div>

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
      <SubmitButton isLoading={isLoading}>Edit</SubmitButton>
    </form>
  );
};

export default EditExpense1;
