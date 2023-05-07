/*
  Warnings:

  - You are about to drop the `Tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Projects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "private"."Tasks" DROP CONSTRAINT "Tasks_project_id_fkey";

-- DropTable
DROP TABLE "private"."Tasks";

-- DropTable
DROP TABLE "public"."Projects";

-- CreateTable
CREATE TABLE "private"."Task" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "due_at" TIMESTAMP(3),
    "name" TEXT,
    "description" TEXT,
    "priority" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "project_id" INTEGER,
    "parent_id" INTEGER,
    "subtask_id" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "private"."Project" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "due_at" TIMESTAMP(3),
    "name" TEXT,
    "description" TEXT,
    "priority" INTEGER,
    "owner_id" INTEGER,
    "status" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "private"."Note" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "content" TEXT,
    "task_id" INTEGER,
    "project_id" INTEGER,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "private"."Task" ADD CONSTRAINT "Task_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "private"."Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "private"."Task" ADD CONSTRAINT "Task_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "private"."Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "private"."Note" ADD CONSTRAINT "Note_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "private"."Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "private"."Note" ADD CONSTRAINT "Note_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "private"."Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
