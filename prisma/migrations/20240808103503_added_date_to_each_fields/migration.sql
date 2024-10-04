/*
  Warnings:

  - Added the required column `debt_date` to the `Debts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expense_date` to the `Expense1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expense_date` to the `Expense2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales_date` to the `FinalTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice_date` to the `InvoiceTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `large_date` to the `LargeElevator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middle_date` to the `MiddleElevator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary_date` to the `Salary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `small_date` to the `SmallElevator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Debts" ADD COLUMN     "debt_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Expense1" ADD COLUMN     "expense_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Expense2" ADD COLUMN     "expense_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "FinalTable" ADD COLUMN     "sales_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "InvoiceTable" ADD COLUMN     "invoice_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "LargeElevator" ADD COLUMN     "large_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "MiddleElevator" ADD COLUMN     "middle_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Salary" ADD COLUMN     "salary_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SmallElevator" ADD COLUMN     "small_date" TIMESTAMP(3) NOT NULL;
