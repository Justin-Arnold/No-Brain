-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);
