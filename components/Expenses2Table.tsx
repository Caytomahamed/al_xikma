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
import { FaTrash, FaEdit } from 'react-icons/fa';
interface Expenses2Props {
  data: any;
  handleDelete: (id: string) => void;
}
const Expenses2Table = ({ data, handleDelete }: Expenses2Props) => {
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
            <TableHead className="text-[#5874c7]">Saliid:</TableHead>
            <TableHead className="text-[#5874c7]">Dayactir:</TableHead>
            <TableHead className="text-[#5874c7]">Spare Parts:</TableHead>
            <TableHead className="text-[#5874c7]">Kharash Yar:</TableHead>
            <TableHead className="text-[#5874c7]">Description:</TableHead>
            <TableHead className="text-[#5874c7]">Net Total:</TableHead>
            <TableHead className="text-[#5874c7]">Date:</TableHead>
            <TableHead className="text-[#5874c7]">Actions:</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((expense: any) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.oil}</TableCell>
              <TableCell>{expense.dayactir}</TableCell>
              <TableCell>{expense.spareParts}</TableCell>
              <TableCell>{expense.smallExpense}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{expense.netTotal}</TableCell>
              <TableCell>{formatDate(expense.expense_date)}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Link
                  className="text-green-500"
                  href={`/dashboard/expense1/edit/${expense.id}`}
                >
                  <FaEdit size={18} />
                </Link>
                /
                <Button
                  onClick={() => handleDelete(expense?.id)}
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

export default Expenses2Table;
