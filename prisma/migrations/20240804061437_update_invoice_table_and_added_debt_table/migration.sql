-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PAID', 'UNPAID', 'CANCELLED');

-- AlterTable
ALTER TABLE "InvoiceTable" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'UNPAID';

-- CreateTable
CREATE TABLE "Debts" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Debts_pkey" PRIMARY KEY ("id")
);
