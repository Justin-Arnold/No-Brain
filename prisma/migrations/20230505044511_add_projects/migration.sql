-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "project_id" INTEGER;

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
