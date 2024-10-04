'use server';
import { db } from '../db';
import { revalidatePath } from 'next/cache';

export const createDebt = async (data: any) => {
  try {
    const debt = await db.debts.create({
      data: data,
    });

    revalidatePath('/dashboard/debts');
    return debt;
  } catch (err) {
    console.log('Error occurred while creating a new debt', err);
  }
};
export const getAllDebt = async () => {
  try {
    const debt = await db.debts.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    revalidatePath('/dashboard/debts');
    return debt;
  } catch (err) {
    console.log('Error occurred while creating a new debt', err);
  }
};
export const getDebtById = async (id: string) => {
  try {
    const debt = await db.debts.findUnique({
      where: {
        id: id,
      },
    });

    revalidatePath('/dashboard/debts');
    return debt;
  } catch (err) {
    console.log('Error occurred while getting a debt', err);
  }
};
export const updateDebt = async (id: string, data: any) => {
  try {
    const updatedDebt = await db.debts.update({
      data: data,
      where: {
        id: id,
      },
    });

    revalidatePath('/dashboard/debts');
    return updatedDebt;
  } catch (err) {
    console.log('Error occurred while updating a debt');
  }
};
export const deleteDebt = async (id: string) => {
  try {
    const deletedDebt = await db.debts.delete({
      where: {
        id: id,
      },
    });

    revalidatePath('/dashboard/debts');
    return deletedDebt;
  } catch (err) {
    console.log('Error occurred while updating a debt');
  }
};
