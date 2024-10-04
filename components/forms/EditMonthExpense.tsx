import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/SubmitButton';

interface EditFormProps {
  id: string;
  form: any;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setForm: (form: any) => void;
}
const EditForm = ({
  id,
  form,
  setForm,
  isLoading,
  setIsLoading,
}: EditFormProps) => {
  return (
    <form className="space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="feePercentage">Khidmada:</Label>
        <Input type="number" name="feePercentage" value={form.feePercentage} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="salary">Mushahar:</Label>
        <Input type="number" name="salary" value={form.salary} />
      </div>
      <SubmitButton isLoading={isLoading}>Edit</SubmitButton>
    </form>
  );
};

export default EditForm;
