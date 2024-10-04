/*
  Warnings:

  - You are about to drop the column `crane` on the `Expense1` table. All the data in the column will be lost.
  - Added the required column `salary` to the `Expense2` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense1" DROP COLUMN "crane";

-- AlterTable
ALTER TABLE "Expense2" ADD COLUMN     "salary" DOUBLE PRECISION NOT NULL;
