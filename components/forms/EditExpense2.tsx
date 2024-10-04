'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SubmitButton from '../SubmitButton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { getAllExpenses1, updateExpense2 } from '@/lib/actions/expense.actions';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { getAllFinal } from '@/lib/actions/final.actions';
interface EditExpense2Props {
  id: string;
  form: any;
  setForm: (form: any) => void;
}
const EditExpense2 = ({ id, form, setForm }: EditExpense2Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [income, setIncome] = useState<any>([]);
  const [sales, setSales] = useState<any>([]);
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
  // Expenses Total
  const fetchExpense = async () => {
    const expenseData: any = await getAllExpenses1();
    let temp: number = 0;
    for (let i = 0; i < expenseData?.length; i++) {
      temp += parseFloat(expenseData[i].netIncome);
    }
    setIncome(temp);
  };
  // Sales total
  const fetchSales = async () => {
    const sale: any = await getAllFinal();
    let temp: number = 0;

    for (let i = 0; i < sale?.length; i++) {
      temp += parseFloat(sale[i].total);
    }

    setSales(temp);
  };

  useEffect(() => {
    // Expenses 1 total
    fetchExpense();
    // Sales total
    fetchSales();
  }, []);

  const adding = form.oil + form.dayactir + form.spareParts + form.smallExpense;
  const netAmount = form.total - adding;
  const result = netAmount;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const resp = await updateExpense2(id, {
        oil: form.oil,
        dayactir: form.dayactir,
        spareParts: form.spareParts,
        smallExpense: form.smallExpense,
        description: form.description,
        salary: form.salary,
        expense_date: date,
        total: netAmount,
        netTotal: result,
      });
      if (resp) {
        router.push('/dashboard/expense1');
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="total">Total:</Label>
        <Input
          type="number"
          min="0"
          max="999999"
          name="total"
          value={form.total}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="oil">Oil:</Label>
        <Input
          type="number"
          min="0"
          max="999999"
          name="oil"
          value={form.oil}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="dayactir">Dayactir:</Label>
        <Input
          type="number"
          name="dayactir"
          value={form.dayactir}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="">Spare Parts:</Label>
        <Input
          type="number"
          min="0"
          max="999999"
          name="spareParts"
          value={form.spareParts}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="">Kharash Yar:</Label>
        <Input
          type="number"
          min="0"
          max="999999"
          name="smallExpense"
          value={form.smallExpense}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="">Description:</Label>
        <Input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="">Salary:</Label>
        <Input
          min="0"
          max="999999"
          type="number"
          name="salary"
          value={form.salary}
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

export default EditExpense2;
