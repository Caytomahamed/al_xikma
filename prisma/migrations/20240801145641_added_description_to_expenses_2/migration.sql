/*
  Warnings:

  - Added the required column `description` to the `Expense2` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense2" ADD COLUMN     "description" DOUBLE PRECISION NOT NULL;
