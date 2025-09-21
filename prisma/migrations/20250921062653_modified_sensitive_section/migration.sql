/*
  Warnings:

  - Made the column `isSensitive` on table `Tweet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Tweet" ALTER COLUMN "isSensitive" SET NOT NULL;
