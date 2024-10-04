'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Card from '@/components/Card';
import { LineGraph } from '@/components/Line';
import { DoughnutChart } from '@/components/DoughnutChart';
import { getAllMonthExpense } from '@/lib/actions/month.actions';
import { getAllInvoice } from '@/lib/actions/invoice.actions';
import { getAllFinal } from '@/lib/actions/final.actions';
import { deleteExpense1, getAllExpenses1 } from '@/lib/actions/expense.actions';
import ExpenseTable from '@/components/ExpenseTable';
import DashExpenses from '@/components/DashExpenses';
import Link from 'next/link';
import { deleteEmployee, getAllEmployee } from '@/lib/actions/employee.actions';
import CustomTable from '@/components/CustomTable';
import DashEmployee from '@/components/DashEmployee';
import { BarGraph } from '@/components/BarGraph';

const cardsData = [
  {
    title: 'Total Bill',
    total: `$3000`,
    collected: 3000,
    pending: 1500,
    backgroundClass: 'bg-gradient-to-r from-blue-400 to-blue-300',
    icon: '/assets/bill.svg',
  },

  {
    title: 'Total Employee',
    total: 5,
    man: 3,
    women: 5,
    backgroundClass: 'bg-gradient-to-r from-purple-500 to-purple-400',
    icon: '/assets/employee.svg',
  },
  {
    title: 'Sales',
    total: `$13720`,
    crane60t: 20,
    crone160t: 50,
    backgroundClass: 'bg-gradient-to-r from-indigo-600 to-indigo-400',
    icon: '/assets/sales.svg',
  },
  {
    title: 'Total Invoice',
    total: 11,
    send: 45,
    customers: 33,
    backgroundClass: 'bg-gradient-to-r from-teal-400 to-teal-300',
    icon: '/assets/invoice.svg',
  },
];

interface ExpenseData {
  id: string;
  fuel: number;
  shaxaad: number;
  salary: number;
  expenses: number;
  description: string;
  total: number;
}

interface EmployeeData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const Dashboard = () => {
  const [income, setIncome] = useState<any>([]);
  const [sales, setSales] = useState<any>([]);
  const [invoiceLength, setInvoiceLength] = useState(0);

  // Function to format the date as 'YYYY-MM-DD'
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Function to get the current month in 'YYYY-MM' format
  const getCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    return `${year}-${month}`;
  };

  const groupExpensesByMonth = (expense: any) => {
    return expense?.reduce((acc: any, data: any) => {
      const month = formatDate(data.date).slice(0, 7);
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += data.total;

      return acc;
    }, {});
  };
  const fetchExpense = async () => {
    const expenseData: any = await getAllMonthExpense();

    setIncome(expenseData);
  };

  const fetchSales = async () => {
    const sale: any = await getAllFinal();
    let temp: number = 0;

    for (let i = 0; i < sale?.length; i++) {
      temp += parseFloat(sale[i].total);
    }

    setSales(temp);
  };

  const fetchInvoice = async () => {
    const invoiceData: any = await getAllInvoice();

    setInvoiceLength(invoiceData?.length);
  };

  useEffect(() => {
    // Expenses
    fetchExpense();
    // Sales
    fetchSales();
    // Invoice
    fetchInvoice();
  }, []);

  const currentMonth = getCurrentMonth();
  const totalByDate = groupExpensesByMonth(income);

  const currentMonthTotal = (totalByDate && totalByDate[currentMonth]) || 0;

  // latest Expense
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
      expense = expense.slice(0, 5);
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

  // Employee
  const [Employeedata, setEmployeeData] = useState<EmployeeData[]>([]);
  const tableHead = {
    fullName: 'FullName',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
  };

  const fetchEmployeeData = async () => {
    let resp: any = await getAllEmployee();

    if (resp) {
      resp = resp.slice(0, 5);
      setEmployeeData(resp);
    }
  };
  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const handleDeleteEmployee = async (id: string) => {
    const result = await deleteEmployee(id);

    if (result) {
      return fetchEmployeeData();
    }
  };

  return (
    <>
      {/* cards */}
      <div className="flex flex-col gap-4 mt-5">
        <div className="bg-gray-100 flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
            {cardsData.map((card, index) => (
              <div
                key={index} // Use a unique key for each card
                className={`relative py-4 px-5 rounded-lg shadow-md text-white  w-[260px] ${card.backgroundClass} flex`}
              >
                <div className="flex-1">
                  <h3 className="text-md font-semibold">{card.title}</h3>
                  <p className="text-2xl font-bold">{card.total}</p>
                  {card.title === 'Total Invoice' && (
                    <>
                      <div className="flex justify-between text-sm mt-2">
                        <span>Send </span>
                        <span>${card.send}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Customers</span>
                        <span>{card.customers}</span>
                      </div>
                    </>
                  )}
                  {card.title === 'Total Bill' && (
                    <>
                      <div className="flex justify-between text-sm mt-2">
                        <span>Collected</span>
                        <span>${card.collected}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Pending bill</span>
                        <span>${card.pending}</span>
                      </div>
                    </>
                  )}
                  {card.title === 'Total Employee' && (
                    <>
                      <div className="flex justify-between text-sm mt-2">
                        <span>Man </span>
                        <span>{card.man}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Women </span>
                        <span>{card.women}</span>
                      </div>
                    </>
                  )}

                  {card.title === 'Sales' && (
                    <>
                      <div className="flex justify-between text-sm mt-2">
                        <span>Crane 25 & 50 </span>
                        <span>${card.crane60t}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Crane 160</span>
                        <span>{card.crone160t}</span>
                      </div>
                    </>
                  )}
                </div>

                <Image
                  src={card.icon}
                  alt="money"
                  width={60}
                  height={60}
                  className="object-contain ml-5"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="flex gap-4 mr-2">
          {/* <LineGraph /> */}
          <BarGraph />

          <DoughnutChart />
        </div>
        <div className="flex gap-6  ">
          <div className="mt-4">
            <Link
              href="/dashboard/expense"
              className="text-[#1C1C1C] font-bold"
            >
              View All Expense
            </Link>
            <DashExpenses handleDelete={handleDelete} data={data} />
          </div>
          <div className="mt-4 flex-1">
            <Link
              href="/dashboard/employee"
              className="text-[#1C1C1C] font-bold"
            >
              View All Employee
            </Link>
            <DashEmployee
              handleDelete={handleDeleteEmployee}
              data={Employeedata}
              head={tableHead}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
