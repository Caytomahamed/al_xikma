'use server';

import { db } from '../db';
import { revalidatePath } from 'next/cache';

// Creating Crane 1--3
export const createCrane1 = async (data: any) => {
  try {
    let crane;

    crane = await db.smallElevator.create({
      data: data,
    });
    revalidatePath(`/dashboard/crane/1`);
    return crane;
  } catch (err) {
    console.error('An error occurred while creating a new crane:', err);
  }
};
export const createCrane2 = async (data: any) => {
  try {
    let crane;

    crane = await db.middleElevator.create({
      data: data,
    });
    revalidatePath(`/dashboard/crane/2`);
    return crane;
  } catch (err) {
    console.error('An error occurred while creating a new crane:', err);
  }
};
export const createCrane3 = async (data: any) => {
  try {
    let crane;

    crane = await db.largeElevator.create({
      data: data,
    });
    revalidatePath(`/dashboard/crane/3`);
    return crane;
  } catch (err) {
    console.error('An error occurred while creating a new crane:', err);
  }
};

// Getting All Crane 1--3
export const getCrane1 = async () => {
  try {
    const crane = await db.smallElevator.findMany();

    revalidatePath(`/dashboard/crane/1`);
    return crane;
  } catch (err) {
    console.error('An error occurred while creating a new crane:', err);
  }
};
export const getCrane2 = async () => {
  try {
    const crane = await db.middleElevator.findMany();

    revalidatePath(`/dashboard/crane/2`);
    return crane;
  } catch (err) {
    console.error('An error occurred while creating a new crane:', err);
  }
};
export const getCrane3 = async () => {
  try {
    const crane = await db.largeElevator.findMany();

    revalidatePath(`/dashboard/crane/3`);
    return crane;
  } catch (err) {
    console.error('An error occurred while creating a new crane:', err);
  }
};

// Getting Single Crane 1--3
export const getCrane1ById = async (id: string) => {
  try {
    const crane = await db.smallElevator.findUnique({
      where: {
        id: id,
      },
    });

    revalidatePath(`/dashboard/crane/1`);
    return crane;
  } catch (err) {
    console.log('Error occurs while getting single crane', err);
  }
};
export const getCrane2ById = async (id: string) => {
  try {
    const crane = await db.middleElevator.findUnique({
      where: {
        id: id,
      },
    });

    revalidatePath(`/dashboard/crane/2`);
    return crane;
  } catch (err) {
    console.log('Error occurs while getting single crane', err);
  }
};
export const getCrane3ById = async (id: string) => {
  try {
    const crane = await db.largeElevator.findUnique({
      where: {
        id: id,
      },
    });

    revalidatePath(`/dashboard/crane/3`);
    return crane;
  } catch (err) {
    console.log('Error occurs while getting single crane', err);
  }
};

// Updating Crane 1--3
export const updateCrane1 = async (id: string, data: any) => {
  try {
    const updatedCrane = await db.smallElevator.update({
      data: data,
      where: {
        id: id,
      },
    });

    revalidatePath('/dashboard/crane/1');
    return updatedCrane;
  } catch (err) {
    console.log('Error occurs while updating crane 1', err);
  }
};
export const updateCrane2 = async (id: string, data: any) => {
  try {
    const updatedCrane = await db.middleElevator.update({
      data: data,
      where: {
        id: id,
      },
    });

    revalidatePath('/dashboard/crane/1');
    return updatedCrane;
  } catch (err) {
    console.log('Error occurs while updating crane 1', err);
  }
};
export const updateCrane3 = async (id: string, data: any) => {
  try {
    const updatedCrane = await db.largeElevator.update({
      data: data,
      where: {
        id: id,
      },
    });

    revalidatePath('/dashboard/crane/1');
    return updatedCrane;
  } catch (err) {
    console.log('Error occurs while updating crane 1', err);
  }
};

// Deleting Crane 1--3
export const deleteCrane1 = async (id: string) => {
  try {
    const deletedCrane = await db.smallElevator.delete({
      where: {
        id: id,
      },
    });
    revalidatePath('/dashboard/crane/1');
    return deletedCrane;
  } catch (err) {
    console.log('Error occurs while deleting crane');
  }
};
export const deleteCrane2 = async (id: string) => {
  try {
    const deletedCrane = await db.middleElevator.delete({
      where: {
        id: id,
      },
    });
    revalidatePath('/dashboard/crane/1');
    return deletedCrane;
  } catch (err) {
    console.log('Error occurs while deleting crane');
  }
};
export const deleteCrane3 = async (id: string) => {
  try {
    const deletedCrane = await db.largeElevator.delete({
      where: {
        id: id,
      },
    });
    revalidatePath('/dashboard/crane/1');
    return deletedCrane;
  } catch (err) {
    console.log('Error occurs while deleting crane');
  }
};
