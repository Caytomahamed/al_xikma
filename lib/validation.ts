import { string, z } from 'zod';

export const employeeValidation = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().min(2).max(50, {
    message: 'email must be at least 50 characters',
  }),
  address: z.string().min(2).max(50, {
    message: 'address must be at least 50 characters',
  }),
  phone: z.string().min(2).max(50, {
    message: 'phone must be at least 50 characters',
  }),
});
export const salaryValidation = z.object({
  amount: z.number().int(),
  horumarin: z.number().int(),
});

export const craneValidation = z.object({
  customer: z.string().min(2, {
    message: 'employeeId must be at least 2 characters',
  }),
  description: z.string().min(2, {
    message: 'employeeId must be at least 2 characters',
  }),
  price: z.number(),
  receipt_no: z.string().min(2),
});

export const expenseValidation = z.object({
  fuel: z.number().int(),
  shaxaad: z.number().int(),
  waterLaydh: z.number().int(),
  internet: z.number().int(),
  salary: z.number().int(),
  expenses: z.number().int(),
  description: z.string().min(2, {
    message: 'description must be at least 2 characters',
  }),
  netIncome: z.number().int(),
});
export const expense1Validation = z.object({
  oil: z.number().int(),
  dayactir: z.number().int(),
  spareParts: z.number().int(),
  smallExpense: z.number().int(),
  description: z.string().min(2, {
    message: 'description must be at least 2 characters',
  }),
  netTotal: z.number().int(),
});

export const finalValidation = z.object({
  crane1: z.number().int(),
  crane2: z.number().int(),
  crane3: z.number().int(),
});

export const debtValidation = z.object({
  company: z.string().min(2, {
    message: 'company name must be at least 2 characters',
  }),
  description: z.string().min(2, {
    message: 'description must be at least 2 characters',
  }),
  amount: z.number().int(),
});

export const monthExpenseValidation = z.object({
  feePercentage: z.number().int(),
  salary: z.number().int(),
});
