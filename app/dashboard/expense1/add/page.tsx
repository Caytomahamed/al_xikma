import Expenses1Form from '@/components/forms/Expenses1Form';
import React from 'react';

const AddExpense = () => {
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-xl text-slate-700 font-semibold">
          Complete The Form
        </h2>
        <p className="text-gray-400 font-normal capitalize">
          Expense form creation.
        </p>
      </div>

      <Expenses1Form />
    </>
  );
};

export default AddExpense;
