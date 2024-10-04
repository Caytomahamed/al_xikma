/*
  Warnings:

  - You are about to drop the column `employee` on the `Salary` table. All the data in the column will be lost.
  - Added the required column `employeeId` to the `Salary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Salary" DROP COLUMN "employee",
ADD COLUMN     "employeeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
