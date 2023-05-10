/*
  Warnings:

  - A unique constraint covering the columns `[linked_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `linked_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE "private".user_id_seq;
ALTER TABLE "private"."User" ADD COLUMN     "linked_id" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('"private".user_id_seq');
ALTER SEQUENCE "private".user_id_seq OWNED BY "private"."User"."id";

-- CreateIndex
CREATE UNIQUE INDEX "User_linked_id_key" ON "private"."User"("linked_id");
