'use client';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { getAllSalary } from '@/lib/actions/salary.actions';
const EmployeeReport = () => {
  const [data, setData] = useState<any>([]);
  const [date, setDate] = useState<Date>();
  const formatDate = (date: Date) => {
    const dateOptions: any = {
      year: 'numeric',
      month: 'long', // or 'short' or 'numeric'
      day: 'numeric',
    };

    return date.toLocaleDateString(undefined, dateOptions);
  };

  useEffect(() => {
    const fetchData = async () => {
      const salary: any = await getAllSalary();

      if (salary) {
        setData(salary);
      }
    };
    fetchData();
  }, []);

  const handleFilterDate = (reportData: any, selectedDate: any) => {
    if (!selectedDate) return data;
    return reportData.filter((report: any) => {
      const reportDate = new Date(report.createdAt);
      return (
        reportDate.toDateString() === new Date(selectedDate).toDateString()
      );
    });
  };

  const filteredData = handleFilterDate(data, date);
  return (
    <div className="flex flex-col gap-3">
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
              format(date, 'PPP')
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

      <div className="bg-white shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#5874c7]">Employee:</TableHead>
              <TableHead className="text-[#5874c7]">Phone:</TableHead>
              <TableHead className="text-[#5874c7]">Address:</TableHead>
              <TableHead className="text-[#5874c7]">Mushaharka:</TableHead>
              <TableHead className="text-[#5874c7]">Horumarin:</TableHead>
              <TableHead className="text-[#5874c7]">Total:</TableHead>
              <TableHead className="text-[#5874c7]">Date:</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((salary: any) => (
              <TableRow key={salary.id}>
                <TableCell>{salary.employee.name}</TableCell>
                <TableCell>{salary.employee.phone}</TableCell>
                <TableCell>{salary.employee.address}</TableCell>
                <TableCell>{salary.amount}</TableCell>
                <TableCell>{salary.horumarin}</TableCell>
                <TableCell>{salary.amount - salary.horumarin}</TableCell>
                <TableCell>{formatDate(salary.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeReport;
