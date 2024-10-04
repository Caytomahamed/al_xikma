import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface FilterProps {
  value: string;
  setValue: (value: string) => void;
}
const Filter = ({ value, setValue }: FilterProps) => {
  const handleSelect = (selected: string) => {
    setValue(selected);
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="w-[300px]">
        <Select onValueChange={handleSelect} defaultValue={value}>
          <SelectTrigger>
            <SelectValue placeholder="Select By Crane" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="crane 20kg">Crane 20t</SelectItem>
            <SelectItem value="crane 60kg">Crane 60t</SelectItem>
            <SelectItem value="crane 160kg">Crane 160t</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filter;
