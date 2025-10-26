# Session Backlog

This directory contains the session backlog, a modular system for managing tasks within an agent session. It is designed to be separate from the main `backlog.md` to allow for session-specific Kanban logic.

## Columns

The session backlog uses the following columns to reflect the lifecycle of session tasks:

- **Plan:** New tasks and ideas are created here. Each task must have atomic acceptance criteria.
- **Approve:** Tasks are moved here after the user has approved the plan and acceptance criteria.
- **Cancel:** Tasks that are rejected by the user are moved here.
- **Doing:** Tasks that are currently in progress.
- **Done:** Tasks that have been completed.

## Workflow

1.  **Initiation:** A dedicated session backlog is created for each interaction session.
2.  **Task Creation:** For every idea or request, a new task is created in the "Plan" column with 3-5 atomic acceptance criteria.
3.  **Approval:** The agent presents the plan and criteria for approval. The user can discuss and edit the acceptance criteria during this phase.
4.  **Execution:** Once approved, the task is moved to "Doing" and then "Done" upon completion.
5.  **Session End:** Every session ends with a "session end" task, which includes a review/retrospective and an improvement for the agent to record in `agent_notes.md`.
