/*
  Warnings:

  - You are about to drop the column `feePercentage` on the `FinalTable` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `FinalTable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FinalTable" DROP COLUMN "feePercentage",
DROP COLUMN "totalAmount";
