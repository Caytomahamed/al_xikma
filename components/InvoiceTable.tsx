'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaTrash, FaEdit } from 'react-icons/fa';

interface InvoiceProps {
  data: any;
  handleDelete: (id: string) => void;
}
const InvoiceTable = ({ data, handleDelete }: InvoiceProps) => {
  const [search, setSearch] = useState('');
  const formatDate = (date: Date) => {
    const dateOptions: any = {
      year: 'numeric',
      month: 'long', // or 'short' or 'numeric'
      day: 'numeric',
    };

    return date.toLocaleDateString(undefined, dateOptions);
  };

  const handleFilter = (invoiceData: any, searchValue: string) => {
    if (!searchValue) return invoiceData;
    return invoiceData.filter((list: any) => {
      return searchValue.toLowerCase() === ''
        ? list
        : list.status.toLowerCase().includes(searchValue);
    });
  };

  let filteredData = handleFilter(data, search);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white shadow-sm w-[300px]">
        <Input
          type="text"
          placeholder="Search By status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-none outline-none focus:outline-[#5874c7] bg-transparent text-slate-600"
        />
      </div>
      <div className="bg-white shadow-md mr-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#5874c7]">Invoice To:</TableHead>
              <TableHead className="text-[#5874c7]">Description:</TableHead>
              <TableHead className="text-[#5874c7]">Price:</TableHead>
              <TableHead className="text-[#5874c7]">Status:</TableHead>
              <TableHead className="text-[#5874c7]">Total:</TableHead>
              <TableHead className="text-[#5874c7]">Date:</TableHead>
              <TableHead className="text-[#5874c7]">Actions:</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.map((invoice: any) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.description}</TableCell>
                <TableCell>{invoice.price}</TableCell>
                <TableCell
                  className={`${
                    invoice.status === 'UNPAID'
                      ? 'text-yellow-600 p-2 text-[14px]'
                      : invoice.status === 'PAID'
                      ? 'text-green-600 p-2 text-[14px]'
                      : 'text-red-600 p-2 text-[14px]'
                  }`}
                >
                  {invoice.status}
                </TableCell>
                <TableCell>{invoice.price}</TableCell>
                <TableCell>{formatDate(invoice.invoice_date)}</TableCell>

                <TableCell className="flex items-center gap-2">
                  <Link
                    className="text-green-500"
                    href={`/dashboard/invoice/edit/${invoice.id}`}
                  >
                    <FaEdit size={18} />
                  </Link>
                  /
                  <Button
                    onClick={() => handleDelete(invoice?.id)}
                    className="bg-transparent border-none text-red-500  hover:bg-transparent"
                  >
                    <FaTrash size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvoiceTable;
