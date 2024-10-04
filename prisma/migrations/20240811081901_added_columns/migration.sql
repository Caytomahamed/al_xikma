/*
  Warnings:

  - Added the required column `subTotal1` to the `monthExpenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTotal2` to the `monthExpenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "monthExpenses" ADD COLUMN     "subTotal1" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "subTotal2" DOUBLE PRECISION NOT NULL;
