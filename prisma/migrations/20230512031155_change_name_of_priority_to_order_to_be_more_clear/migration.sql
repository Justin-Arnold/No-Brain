/*
  Warnings:

  - You are about to drop the column `priority` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "private"."Project" DROP COLUMN "priority",
ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "private"."Task" DROP COLUMN "priority",
ADD COLUMN     "order" INTEGER;
