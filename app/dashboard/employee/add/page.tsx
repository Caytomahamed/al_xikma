import EmployeeForm from '@/components/forms/EmployeeForm';

const CreateEmployee = () => {
  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="space-y-2">
        <h2 className="text-xl text-slate-700 font-semibold">
          Complete The Form
        </h2>
        <p className="text-gray-400 font-normal">employee form creation.</p>
      </div>

      <EmployeeForm />
    </div>
  );
};

export default CreateEmployee;
