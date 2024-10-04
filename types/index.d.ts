declare interface EmployeeParams {
  name: string;
  email: string;
  phone: string;
  address: string;
}

declare interface SalaryParams {
  employeeId: string;
  amount: number;
  horumarin: number;
  salary_date: Date;
  total: number;
}

declare interface CraneParams {
  id?: string;
  customer: string;
  description: string;
  price: number;
  receipt_no: string;
}

declare interface DebtParams {
  id?: string;
  company: string;
  description: string;
  amount: number;
}

declare interface Expense {
  id: string; // UUID string
  description: string; // Description of the expense
  createdAt: Date; // Date the record was created
  updateAt: Date; // Date the record was updated
  expense_date: Date; // Date of the expense
  expenses: number; // Amount spent on general expenses
  fuel: number; // Fuel expenses
  internet: number; // Internet expenses
  netIncome: number; // Net income value
  salary: number; // Salary expenses
  shaxaad: number; // Shaxaad (donations or gratuity)
  total: number; // Total amount
  waterLayadh: number; // Water and electricity expenses
}
