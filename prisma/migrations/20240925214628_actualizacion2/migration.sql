/*
  Warnings:

  - You are about to alter the column `rewardAmount` on the `Publication` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Publication" ALTER COLUMN "rewardAmount" DROP NOT NULL,
ALTER COLUMN "rewardAmount" SET DATA TYPE DOUBLE PRECISION;
