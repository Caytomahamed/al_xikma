/*
  Warnings:

  - You are about to drop the column `employeId` on the `Salary` table. All the data in the column will be lost.
  - Added the required column `employee` to the `Salary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Salary" DROP CONSTRAINT "Salary_employeId_fkey";

-- DropIndex
DROP INDEX "Salary_employeId_idx";

-- AlterTable
ALTER TABLE "Salary" DROP COLUMN "employeId",
ADD COLUMN     "employee" TEXT NOT NULL;
