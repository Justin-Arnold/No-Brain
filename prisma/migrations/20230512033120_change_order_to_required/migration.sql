/*
  Warnings:

  - Made the column `order` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "private"."Task" ALTER COLUMN "order" SET NOT NULL;
