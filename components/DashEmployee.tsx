import { FaTrash, FaEdit } from 'react-icons/fa';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface CustomProps {
  data: any;
  head: any;
  handleDelete: (id: string) => void;
}
const DashEmployee = ({
  data,
  head: { fullName, email, phone, address },
  handleDelete,
}: CustomProps) => {
  const formatDate = (date: Date) => {
    const dateOptions: any = {
      year: 'numeric',
      month: 'long', // or 'short' or 'numeric'
      day: 'numeric',
    };

    return date.toLocaleDateString(undefined, dateOptions);
  };

  return (
    <div className="bg-white shadow-md mx-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-[#5874c7]">{fullName}</TableHead>
            <TableHead className="text-[#5874c7]">{phone}</TableHead>
            <TableHead className="text-[#5874c7]">{address}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((employee: any) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.phone}</TableCell>
              <TableCell>{employee.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashEmployee;
