import FinalForm from '@/components/forms/FinalForm';

const Final = () => {
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-xl text-slate-700 font-semibold">
          Complete The Form
        </h2>
        <p className="text-gray-400 font-normal capitalize">
          Crane form creation.
        </p>
      </div>

      <FinalForm />
    </>
  );
};

export default Final;
