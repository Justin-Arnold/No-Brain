-- Enable RLS
ALTER TABLE Task ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tasks" ON Task
    FOR SELECT
    USING (
        project_id IN (
            SELECT id FROM Project
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert tasks to their projects" ON Task
    FOR INSERT
    WITH CHECK (
        project_id IN (
            SELECT id FROM Project
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own tasks" ON Task
    FOR UPDATE
    USING (
        project_id IN (
            SELECT id FROM Project
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete their own tasks" ON Task
    FOR DELETE
    USING (
        project_id IN (
            SELECT id FROM Project
            WHERE user_id = auth.uid()
        )
    );  