import SalaryForm from '@/components/forms/SalaryForm';

const AddSalary = () => {
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-xl text-slate-700 font-semibold">
          Complete The Form
        </h2>
        <p className="text-gray-400 font-normal capitalize">
          salary form creation.
        </p>
      </div>

      <SalaryForm />
    </>
  );
};

export default AddSalary;
