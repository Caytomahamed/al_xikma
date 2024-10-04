'use client';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

import SubmitButton from '@/components/SubmitButton';
import FormFields from '@/components/FormFields';
import { monthExpenseValidation } from '@/lib/validation';
import { getAllSalary } from '@/lib/actions/salary.actions';
import {
  getAllExpenses1,
  getAllExpenses2,
} from '@/lib/actions/expense.actions';
import { createMonthExpense } from '@/lib/actions/month.actions';
import { getAllFinal } from '@/lib/actions/final.actions';

const AddMonthExpenses = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [expense1, setExpense1] = useState<any>([]);
  const [expense2, setExpense2] = useState<any>([]);
  const [sales, setSales] = useState<any>([]);
  const [salaryData, setSalaryData] = useState<any>([]);
  const [date, setDate] = useState<Date>();

  const fetchSalary = async () => {
    const salaryData: any = await getAllSalary();
    let temp: number = 0;
    for (let i = 0; i < salaryData?.length; i++) {
      temp += parseFloat(salaryData[i]?.amount);
    }
    setSalaryData(temp);
  };
  // Expenses 1
  const fetchExpense1 = async () => {
    const expense: any = await getAllExpenses1();
    let temp: number = 0;
    for (let i = 0; i < expense?.length; i++) {
      temp += parseFloat(expense[i]?.netIncome);
    }
    setExpense1(temp);
  };

  // Expenses 2
  const fetchExpense2 = async () => {
    const expense: any = await getAllExpenses2();

    let temp: number = 0;
    for (let i = 0; i < expense?.length; i++) {
      temp += parseFloat(expense[i]?.netTotal);
    }
    setExpense2(temp);
  };

  // Total Sales
  const fetchSales = async () => {
    const salesData: any = await getAllFinal();

    let temp: number = 0;
    for (let i = 0; i < salesData?.length; i++) {
      temp += parseFloat(salesData[i]?.total);
    }
    setSales(temp);
  };

  useEffect(() => {
    fetchSalary();
    fetchExpense1();
    fetchExpense2();
    fetchSales();
  }, []);

  const form = useForm<z.infer<typeof monthExpenseValidation>>({
    resolver: zodResolver(monthExpenseValidation),
    defaultValues: {
      salary: 0,
      feePercentage: 0,
    },
  });

  const feePercentageValue: number = Math.floor(
    ((sales - expense1) * 17) / 100
  );
  console.log(feePercentageValue);
  async function onSubmit(values: z.infer<typeof monthExpenseValidation>) {
    setIsLoading(true);
    try {
      let { salary, feePercentage } = values;
      feePercentage = feePercentageValue;
      const result = sales - expense1;
      const result1 = result - feePercentage;
      const result2 = result1 - expense2 - salaryData;
      const netTotal = result2;
      const expense = await createMonthExpense({
        expenses1: expense1,
        feePercentage: feePercentage,
        subTotal1: result1,
        expenses2: expense2,
        salary: salaryData,
        subTotal2: result2,
        sales: sales,
        date: date,
        total: netTotal,
      });

      if (expense) {
        router.push('/dashboard/monthExpenses');
        setIsLoading(false);
      }
    } catch (err) {
      console.log('Error:', err);
    }
    setIsLoading(false);
  }
  return (
    <div className="space-y-4">
      <h2 className="text-gray-400 text-xl font-semibold">Complete The Form</h2>

      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="expenses1">Expenses 1</Label>
            <Input type="number" readOnly name="expenses1" value={expense1} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="khidmada">Khidmada:</Label>
            <Input
              type="number"
              readOnly
              name="khidmada"
              value={feePercentageValue}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="salary">Salary 1</Label>
            <Input type="number" readOnly name="salary" value={salaryData} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="expenses2">Expenses 2:</Label>
            <Input type="number" readOnly name="expenses2" value={expense2} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="sales">Total Sales:</Label>
            <Input type="number" readOnly name="sales" value={sales} />
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

          <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default AddMonthExpenses;
