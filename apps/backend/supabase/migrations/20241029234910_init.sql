CREATE TYPE status AS ENUM ('not_started', 'in_progress', 'on_hold', 'completed', 'cancelled');

-- CreateTable
CREATE TABLE Task (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_at" TIMESTAMP(3),
    "name" TEXT NOT NULL DEFAULT 'New Task',
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" status NOT NULL DEFAULT 'not_started',
    "project_id" UUID NOT NULL,
    "milestone_id" UUID,
    "parent_id" UUID,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE Project (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_at" TIMESTAMP(3),
    "name" TEXT NOT NULL DEFAULT 'New Project',
    "description" TEXT,
    "order" INTEGER,
    "user_id" UUID NOT NULL,
    "area_id" UUID,
    "status" status NOT NULL DEFAULT 'not_started',

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- Create Milestone Table
CREATE TABLE Milestone (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_at" TIMESTAMP(3),
    "name" TEXT NOT NULL DEFAULT 'New Milestone',
    "description" TEXT,
    "order" INTEGER,
    "status" status NOT NULL DEFAULT 'not_started',
    "project_id" UUID NOT NULL,

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE Area (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL DEFAULT 'New Area',
    "description" TEXT,
    "user_id" UUID NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- Many (project) to Many (area) relation
ALTER TABLE Project ADD CONSTRAINT "project_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Many (project) to one (user) relation
ALTER TABLE Project ADD CONSTRAINT "project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Many (area) to one (user) relation
ALTER TABLE Area ADD CONSTRAINT "area_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Many (task) to one (project) relation
ALTER TABLE Task ADD CONSTRAINT "task_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- One (task) to one (task) relation
ALTER TABLE Task ADD CONSTRAINT "task_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Many (task) to one (milestone) relation
ALTER TABLE Task ADD CONSTRAINT "task_milestone_id_fkey" FOREIGN KEY ("milestone_id") REFERENCES "milestone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Many (milestone) to one (project) relation
ALTER TABLE Milestone ADD CONSTRAINT "milestone_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add indexes for common query patterns
CREATE INDEX "idx_task_project_id" ON Task ("project_id");
CREATE INDEX "idx_task_milestone_id" ON Task ("milestone_id");
CREATE INDEX "idx_milestone_project_id" ON Milestone ("project_id");
CREATE INDEX "idx_project_user_id" ON Project ("user_id");
CREATE INDEX "idx_project_area_id" ON Project ("area_id");
CREATE INDEX "idx_area_user_id" ON Area ("user_id");

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Task Table Trigger
CREATE TRIGGER set_task_timestamp
BEFORE UPDATE ON Task
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Project Table Trigger
CREATE TRIGGER set_project_timestamp
BEFORE UPDATE ON Project
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Milestone Table Trigger
CREATE TRIGGER set_milestone_timestamp
BEFORE UPDATE ON Milestone
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Area Table Trigger
CREATE TRIGGER set_area_timestamp
BEFORE UPDATE ON Area
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Function to reorder tasks when a task's order changes or is deleted
CREATE OR REPLACE FUNCTION reorder_tasks()
RETURNS TRIGGER AS $$
DECLARE
    max_order INTEGER;
BEGIN
    -- Handle DELETE operation
    IF (TG_OP = 'DELETE') THEN
        -- Update order of remaining tasks in the same project
        UPDATE Task
        SET "order" = "order" - 1
        WHERE project_id = OLD.project_id
          AND "order" > OLD."order";
        RETURN OLD;
    END IF;

    -- Handle INSERT or UPDATE operations
    IF (TG_OP = 'INSERT') OR (OLD."order" != NEW."order") THEN
        -- If no order specified, put it at the end
        IF NEW."order" IS NULL THEN
            SELECT COALESCE(MAX("order") + 1, 0)
            INTO NEW."order"
            FROM Task
            WHERE project_id = NEW.project_id;
        END IF;

        -- Update order of other tasks in the same project
        UPDATE Task
        SET "order" = "order" + 1
        WHERE project_id = NEW.project_id
          AND "order" >= NEW."order"
          AND id != NEW.id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Updated trigger to include DELETE
CREATE TRIGGER task_reorder_trigger
    BEFORE INSERT OR UPDATE OF "order" OR DELETE
    ON Task
    FOR EACH ROW
    EXECUTE FUNCTION reorder_tasks();
