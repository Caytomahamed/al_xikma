'use client';
import Crane from '@/components/forms/Crane';
import React from 'react';

const AddCrane = ({ params }: any) => {
  return (
    <div className="flex flex-col mx-4">
      <div className="space-y-2">
        <h2 className="text-xl text-slate-700 font-semibold">
          Complete The Form
        </h2>
        <p className="text-gray-400 font-normal capitalize">
          crane form creation.
        </p>
      </div>
      <Crane id={params.id} />
    </div>
  );
};

export default AddCrane;
