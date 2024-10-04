'use server';

import { db } from '../db';
import { revalidatePath } from 'next/cache';

// Expenses 1
export const createExpense1 = async (data: any) => {
  try {
    const expense = await db.expense1.create({
      data: data,
    });

    revalidatePath('/dashboard/expense');
    return expense;
  } catch (err) {
    console.error('An error occurred while creating a new expense:', err);
  }
};

export const getAllExpenses1 = async () => {
  try {
    const expense = await db.expense1.findMany();

    revalidatePath('/dashboard/expense');

    return expense;
  } catch (err) {
    console.error('An error occurred while creating a new expense1:', err);
  }
};

export const getExpense1ById = async (id: string) => {
  try {
    const expense = await db.expense1.findUnique({
      where: {
        id: id,
      },
    });
    revalidatePath('/dashboard/expense1');
    return expense;
  } catch (err) {
    console.error('An error occurred while creating a new expense1:', err);
  }
};

export const updateExpense1 = async (id: string, data: any) => {
  try {
    const updatedExpense = await db.expense1.update({
      where: {
        id: id,
      },
      data: data,
    });

    revalidatePath('/dashboard/expense');

    return updatedExpense;
  } catch (err) {
    console.log('Error at updating expense1', err);
  }
};

export const deleteExpense1 = async (id: string) => {
  try {
    const deletedExpense = await db.expense1.delete({
      where: {
        id: id,
      },
    });

    revalidatePath('/dashboard/expense');
    return deletedExpense;
  } catch (err) {
    console.log('Error at deleting expense', err);
  }
};

// Expenses 2
export const createExpense2 = async (data: any) => {
  try {
    const expense = await db.expense2.create({
      data: data,
    });

    revalidatePath('/dashboard/expense1');
    return expense;
  } catch (err) {
    console.error('An error occurred while creating a new expense 2:', err);
  }
};

export const getAllExpenses2 = async () => {
  try {
    const expense = await db.expense2.findMany();
    revalidatePath('/dashboard/expense1');
    return expense;
  } catch (err) {
    console.log('error well getting expenses 2', err);
  }
};

export const getExpense2ById = async (id: string) => {
  try {
    const expense = await db.expense2.findUnique({
      where: {
        id: id,
      },
    });
    revalidatePath('/dashboard/expense1');
    return expense;
  } catch (err) {
    console.error('An error occurred while getting expense2:', err);
  }
};

export const updateExpense2 = async (id: string, data: any) => {
  try {
    const updatedExpense = await db.expense2.update({
      where: {
        id: id,
      },
      data: data,
    });

    revalidatePath('/dashboard/expense');

    return updatedExpense;
  } catch (err) {
    console.log('Error at updating expense1', err);
  }
};

export const deleteExpense2 = async (id: string) => {
  try {
    const deletedExpense = await db.expense2.delete({
      where: {
        id: id,
      },
    });

    revalidatePath('/dashboard/expense');
    return deletedExpense;
  } catch (err) {
    console.log('Error at deleting expense', err);
  }
};
