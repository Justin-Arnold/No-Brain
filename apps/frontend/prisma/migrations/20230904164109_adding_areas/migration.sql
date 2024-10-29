-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "area_id" UUID;

-- CreateTable
CREATE TABLE "Area" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'New Area',
    "description" TEXT,
    "user_id" UUID,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
