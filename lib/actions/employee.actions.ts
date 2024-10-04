'use server';

import { db } from '../db';
import { revalidatePath } from 'next/cache';
export const createEmployee = async (data: EmployeeParams) => {
  try {
    const employee = await db.employee.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
    });

    revalidatePath('/dashboard/employee');
    return employee;
  } catch (err) {
    console.error('An error occurred while creating a new employee:', err);
  }
};

export const getAllEmployee = async () => {
  try {
    const employees = await db.employee.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!employees) {
      console.log('No Data Found');
    }

    revalidatePath('/dashboard/employee');
    return employees;
  } catch (err) {
    console.error('An error occurred while getting employees:', err);
  }
};
export const getEmployee = async (id: string) => {
  try {
    const employee = await db.employee.findUnique({
      where: {
        id: id,
      },
    });

    revalidatePath('/dashboard/employee');
    return employee;
  } catch (err) {
    console.error('An error occurred while getting employees:', err);
  }
};

export const editEmployee = async (id: string, data: any) => {
  try {
    const updatedEmployee = await db.employee.update({
      data: data,
      where: {
        id: id,
      },
    });
    revalidatePath('/dashboard/employee');
    return updatedEmployee;
  } catch (err) {
    console.log('Error at Editing Employee', err);
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    const deletedEmployee = await db.employee.delete({
      where: {
        id: id,
      },
    });

    revalidatePath('/dashboard/employee');

    return deletedEmployee;
  } catch (err) {
    console.log('Error at Deleting Employee', err);
  }
};
