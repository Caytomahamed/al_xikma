'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../db';

export const createInvoice = async (data: any) => {
  try {
    const invoice = await db.invoiceTable.create({
      data: data,
    });

    return invoice;
  } catch (err) {
    console.log('Error while creating a new invoice', err);
  }
};

export const getInVoice = async (id: any) => {
  try {
    const invoice = await db.invoiceTable.findFirst({
      where: {
        id: id,
      },
    });

    revalidatePath('/dashboard');
    return invoice;
  } catch (err) {
    console.log('Error while getting invoice', err);
  }
};

export const getAllInvoice = async () => {
  try {
    const invoice = await db.invoiceTable.findMany();
    revalidatePath('/dashboard');
    return invoice;
  } catch (err) {
    console.log('Error while getting invoice', err);
  }
};

export const getInvoiceById = async (id: string) => {
  try {
    const invoice = await db.invoiceTable.findUnique({
      where: {
        id,
      },
    });
    revalidatePath('/dashboard/invoice');

    return invoice;
  } catch (err) {
    console.log('Error while getting invoice', err);
  }
};

export const editInvoice = async (id: string, data: any) => {
  try {
    const updatedInvoice = await db.invoiceTable.update({
      data: data,
      where: {
        id: id,
      },
    });
    revalidatePath('/dashboard/invoice');
    return updatedInvoice;
  } catch (err) {
    console.log('Error while updating invoice', err);
  }
};

export const deleteInvoice = async (id: string) => {
  try {
    const deletedInvoice = await db.invoiceTable.delete({
      where: {
        id: id,
      },
    });

    revalidatePath('/dashboard/invoice');
    return deletedInvoice;
  } catch (err) {
    console.log('Error while deleting invoice', err);
  }
};
