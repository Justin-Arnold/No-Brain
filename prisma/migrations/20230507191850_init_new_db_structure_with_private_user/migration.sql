/*
  Warnings:

  - You are about to drop the column `owner_id` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "private"."Project" DROP COLUMN "owner_id",
ADD COLUMN     "user_id" INTEGER;

-- CreateTable
CREATE TABLE "private"."User" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "private"."Project" ADD CONSTRAINT "Project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "private"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
