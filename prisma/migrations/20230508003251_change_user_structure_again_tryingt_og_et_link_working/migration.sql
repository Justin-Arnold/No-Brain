-- DropForeignKey
ALTER TABLE "private"."Project" DROP CONSTRAINT "Project_user_id_fkey";

-- AlterTable
ALTER TABLE "private"."Project" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "private"."Project" ADD CONSTRAINT "Project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "private"."User"("linked_id") ON DELETE SET NULL ON UPDATE CASCADE;
