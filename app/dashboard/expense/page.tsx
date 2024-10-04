'use client';
import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';

import ExpenseTable from '@/components/ExpenseTable';
import { getAllExpenses1, deleteExpense1 } from '@/lib/actions/expense.actions';

interface ExpenseData {
  id: string;
  fuel: number;
  shaxaad: number;
  salary: number;
  expenses: number;
  description: string;
  total: number;
}
const Expense = () => {
  const [data, setData] = useState<ExpenseData[]>([]);

  // order the expense data by date use  data.expense_date
  function orderExpensesByDate(expenses: Expense[]): Expense[] {
    return expenses.sort(
      (a, b) =>
        new Date(b.expense_date).getTime() - new Date(a.expense_date).getTime()
    );
  }

  const fetchData = async () => {
    let expense: any = await getAllExpenses1();

    if (expense) {
      expense = orderExpensesByDate(expense);
      setData(expense);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const resp = await deleteExpense1(id);

    if (resp) {
      return fetchData();
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-slate-800 font-semibold text-2xl">Expense 1</h2>
      <Link
        className="bg-[#395CA0] rounded-md text-white text-base font-semibold py-4 px-2 w-[100px] flex items-center  gap-2"
        href="/dashboard/expense/add"
      >
        <FaPlus className="text-white" />
        Create
      </Link>

      <ExpenseTable handleDelete={handleDelete} data={data} />
    </div>
  );
};

export default Expense;
