/*
  Warnings:

  - Made the column `name` on table `Note` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "private"."Note" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'New Note';

-- AlterTable
ALTER TABLE "private"."Project" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'New Project';

-- AlterTable
ALTER TABLE "private"."Task" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'New Task';
