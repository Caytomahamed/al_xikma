/*
  Warnings:

  - You are about to drop the column `internet` on the `Expense2` table. All the data in the column will be lost.
  - You are about to drop the column `waterLayadh` on the `Expense2` table. All the data in the column will be lost.
  - Added the required column `internet` to the `Expense1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waterLayadh` to the `Expense1` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense1" ADD COLUMN     "internet" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "waterLayadh" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Expense2" DROP COLUMN "internet",
DROP COLUMN "waterLayadh";
