'use client';
import { useState, useEffect } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import EmployeeReport from '@/components/EmployeeReport';
import InvoiceReport from '@/components/InvoiceReport';
const DebtPage = () => {
  const [selected, setSelected] = useState('Employee');
  const handleSelected = (selectedValue: string) => {
    setSelected(selectedValue);
  };

  return (
    <div className="space-y-5">
      {/* Filter and Heading */}

      <h2 className="text-2xl text-slate-700 font-semibold">Report Section.</h2>

      {/* select type */}
      <div className="w-[300px]">
        <Select onValueChange={handleSelected} defaultValue={selected}>
          <SelectTrigger>
            <SelectValue placeholder="Select either employee or invoice" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Employee">Employee</SelectItem>
            <SelectItem value="Invoice">Invoice</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selected === 'Employee' ? (
        <div className="flex flex-col mt-10 gap-4">
          <EmployeeReport />
        </div>
      ) : (
        <InvoiceReport />
      )}
    </div>
  );
};

export default DebtPage;
