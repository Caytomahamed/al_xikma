'use server';
import { db } from '../db';
import { revalidatePath } from 'next/cache';

export const getAllMonthExpense = async () => {
  try {
    const expense = await db.monthExpenses.findMany();

    revalidatePath('/dashboard/monthExpenses');
    return expense;
  } catch (err) {
    console.log('Error occurred at getting all month expenses', err);
  }
};

export const createMonthExpense = async (data: any) => {
  try {
    const expense = await db.monthExpenses.create({
      data: data,
    });

    revalidatePath('/dashboard/monthExpenses');
    return expense;
  } catch (err) {
    console.log('Error occurred at creating a new month expenses', err);
  }
};

export const getMonthExpenseById = async (id: string) => {
  try {
    const expense = await db.monthExpenses.findUnique({
      where: {
        id: id,
      },
    });
    revalidatePath('/dashboard/monthExpenses');
    return expense;
  } catch (err) {
    console.log('Error occurred at getting a month expense', err);
  }
};

export const updateMonthExpense = async (id: string, data: any) => {
  try {
    const updatedMonthExpense = await db.monthExpenses.update({
      data: data,
      where: {
        id: id,
      },
    });
    revalidatePath('/dashboard/monthExpenses');
    return updatedMonthExpense;
  } catch (err) {
    console.log('Error occurred at updating a month expense', err);
  }
};
