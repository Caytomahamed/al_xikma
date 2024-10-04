'use server';

import { db } from '../db';
import { revalidatePath } from 'next/cache';

export const createFinal = async (data: any) => {
  try {
    const final = await db.finalTable.create({
      data: data,
    });

    revalidatePath('/dashboard/expense/add');
    return final;
  } catch (err) {
    console.log('Error at Creating Final Table', err);
  }
};

export const getAllFinal = async () => {
  try {
    const final = await db.finalTable.findMany();
    revalidatePath('/dashboard/expense/add');
    return final;
  } catch (err) {
    console.log('Error at Getting Final Table', err);
  }
};
