import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Link from 'next/link';

interface DebtProps {
  data: any;
  handleDelete: (id: string) => void;
}
const DebtTable = ({ data, handleDelete }: DebtProps) => {
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
            <TableHead>Company:</TableHead>
            <TableHead>Description:</TableHead>
            <TableHead>Amount:</TableHead>
            <TableHead>Date:</TableHead>
            <TableHead>Actions:</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((debt: any) => (
            <TableRow key={debt?.id}>
              <TableCell>{debt?.company}</TableCell>
              <TableCell>{debt?.description}</TableCell>
              <TableCell>{debt?.amount}</TableCell>
              <TableCell>{formatDate(debt?.debt_date)}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Link
                  className="text-green-500"
                  href={`/dashboard/debts/edit/${debt?.id}`}
                >
                  <FaEdit size={18} />
                </Link>
                /
                <Button
                  onClick={() => handleDelete(debt?.id)}
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
  );
};

export default DebtTable;
