/*
  Warnings:

  - You are about to drop the `FinalTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FinalTable";

-- CreateTable
CREATE TABLE "Expense1" (
    "id" TEXT NOT NULL,
    "fuel" DOUBLE PRECISION NOT NULL,
    "shaxaad" DOUBLE PRECISION NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "expenses" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "crane" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "feePercentage" DOUBLE PRECISION NOT NULL,
    "netIncome" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense2" (
    "id" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "oil" DOUBLE PRECISION NOT NULL,
    "waterLayadh" DOUBLE PRECISION NOT NULL,
    "internet" DOUBLE PRECISION NOT NULL,
    "dayactir" DOUBLE PRECISION NOT NULL,
    "spareParts" DOUBLE PRECISION NOT NULL,
    "smallExpense" DOUBLE PRECISION NOT NULL,
    "netTotal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense2_pkey" PRIMARY KEY ("id")
);
