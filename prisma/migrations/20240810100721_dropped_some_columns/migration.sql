/*
  Warnings:

  - You are about to drop the column `feePercentage` on the `Expense1` table. All the data in the column will be lost.
  - You are about to drop the column `salary` on the `Expense2` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Expense2` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expense1" DROP COLUMN "feePercentage";

-- AlterTable
ALTER TABLE "Expense2" DROP COLUMN "salary",
DROP COLUMN "total";

-- CreateTable
CREATE TABLE "monthExpenses" (
    "id" TEXT NOT NULL,
    "expenses1" DOUBLE PRECISION NOT NULL,
    "feePercentage" DOUBLE PRECISION NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "expenses2" DOUBLE PRECISION NOT NULL,
    "sales" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monthExpenses_pkey" PRIMARY KEY ("id")
);
