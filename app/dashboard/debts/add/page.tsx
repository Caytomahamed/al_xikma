import DebtForm from '@/components/forms/DebtForm';

const CreateDebt = () => {
  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="space-y-2">
        <h2 className="text-xl text-slate-700 font-semibold">
          Complete The Form
        </h2>
        <p className="text-gray-400 font-normal">debts form creation.</p>
      </div>

      <DebtForm />
    </div>
  );
};

export default CreateDebt;
