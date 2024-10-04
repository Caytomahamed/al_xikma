'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import SubmitButton from '@/components/SubmitButton';
import { editInvoice } from '@/lib/actions/invoice.actions';
interface EditInvoiceProps {
  id: string;
  form: any;
  setForm: (id: string) => void;
}
const EditInvoice = ({ id, form, setForm }: EditInvoiceProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [date, setDate] = useState<Date>();
  const handleChange = (e: any) => {
    let valueForm: string | number = e.target.value;
    let name: string = e.target.name;
    let type: string = e.target.type;
    console.log('Type', type);
    console.log('Name', name);

    if (type === 'number') {
      valueForm = e.target.valueAsNumber;
    }

    setForm({
      ...form,
      [name]: valueForm,
    });
  };

  const handleSelectedValue = (selectedItem: string) => {
    setSelectedValue(selectedItem);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await editInvoice(id, {
        customer: form.customer,
        description: form.description,
        price: form.price,
        invoice_date: date,
        status: selectedValue,
      });

      if (resp) {
        router.push('/dashboard/invoice');
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="customer">Invoice To:</Label>
        <Input
          type="text"
          name="customer"
          placeholder="Edit Invoice To..."
          value={form.customer}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description:</Label>
        <Input
          type="text"
          name="description"
          placeholder="Edit Description..."
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Price:</Label>
        <Input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="status">Status:</Label>
        <Select
          onValueChange={handleSelectedValue}
          defaultValue={selectedValue}
        >
          <SelectTrigger>
            <SelectValue placeholder="Edit Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="UNPAID">UNPAID</SelectItem>
            <SelectItem value="PAID">PAID</SelectItem>
            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
          </SelectContent>
        </Select>
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
      <SubmitButton isLoading={isLoading}>Edit</SubmitButton>
    </form>
  );
};

export default EditInvoice;
