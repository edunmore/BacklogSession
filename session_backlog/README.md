# Session Backlog

This directory contains the session backlog, a modular and session-specific Kanban system for managing tasks during an agent interaction. It is designed to be separate from the main project `backlog.md` to allow for tailored, in-session task management.

## Directory Structure

The `session_backlog` directory mirrors the main `backlog` structure for consistency and upstream compatibility.

- `tasks/`: Contains the Kanban columns as markdown files.
- `archive/`: For completed or cancelled session backlogs.
- `docs/`: Documentation specific to the session backlog.
- `...`: Other directories are placeholders for compatibility.

## Kanban Columns

The session backlog uses the following columns to track the lifecycle of a task:

- **plan.md**: New tasks and ideas are added here. Each task must have atomic acceptance criteria (3-5 per task).
- **approve.md**: Tasks that have been reviewed and approved by the user.
- **cancel.md**: Tasks that have been explicitly rejected.
- **doing.md**: Tasks that are currently in progress.
- **done.md**: Tasks that have been completed, with all acceptance criteria met.

## Usage

1. **Session Start**: A new session backlog is created or an existing one is reopened.
2. **Task Planning**: As ideas are discussed, they are added to `plan.md` with clear acceptance criteria.
3. **Approval**: The agent presents the tasks for approval. The user can discuss and edit acceptance criteria at this stage.
4. **Execution**: Approved tasks are moved to `doing.md` and then to `done.md` upon completion.
5. **Session End**: The session concludes with a review, and the agent records a self-improvement note in `agent_notes.md`.
