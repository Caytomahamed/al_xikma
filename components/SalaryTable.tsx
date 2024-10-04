'use client';
import React from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Button } from '@/components/ui/button';
import { FaTrash, FaEdit } from 'react-icons/fa';
interface SalaryProps {
  data: any;
  handleDelete: (id: string) => void;
}
const SalaryTable = ({ data, handleDelete }: SalaryProps) => {
  const formatDate = (date: Date) => {
    const dateOptions: any = {
      year: 'numeric',
      month: 'long', // or 'short' or 'numeric'
      day: 'numeric',
    };

    return date.toLocaleDateString(undefined, dateOptions);
  };
  return (
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
            <TableHead className="text-[#5874c7]">Actions:</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((salary: any) => (
            <TableRow key={salary.id}>
              <TableCell>{salary.employee.name}</TableCell>
              <TableCell>{salary.employee.phone}</TableCell>
              <TableCell>{salary.employee.address}</TableCell>
              <TableCell>{salary.amount}</TableCell>
              <TableCell>{salary.horumarin}</TableCell>
              <TableCell>{salary.total}</TableCell>
              <TableCell>{formatDate(salary.salary_date)}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Link
                  className="text-green-500"
                  href={`/dashboard/salary/edit/${salary.id}`}
                >
                  <FaEdit size={18} />
                </Link>
                /
                <Button
                  onClick={() => handleDelete(salary?.id)}
                  className="bg-transparent  border-none text-red-500  hover:bg-transparent"
                >
                  <FaTrash size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SalaryTable;
