/*
  Warnings:

  - Made the column `clerkId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "location" TEXT,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "clerkId" SET NOT NULL;
