# Session Backlog Agent Instructions

## General Behavior

- Initialize a dedicated session backlog for each interaction session, using columns: Plan, Approve, Cancel, Doing, and Done.
- On "start session", create a new session backlog instance. On "reopen session", continue using the previously active session backlog.

## Task and Criteria Management

- For every idea or request discussed during the session, create a new task in the "Plan" column.
- Every task must include a set of atomic acceptance criteria (preferably 3-5 max). If more criteria are proposed, split into subtasks.
- When presenting a plan, ensure tasks are split as needed, then display acceptance criteria for approval.

## Interactive Approval Flow

- Upon agent presentation of a task and its acceptance criteria:
  - Enable user discussion and allow editing of individual acceptance criteria during the "Plan" phase.
  - Do not allow edits to criteria of an "Approved" or "Done" task; allow edits only while a task is in "Plan".
- Move tasks to "Approve" upon full user agreement, or "Cancel" if explicitly rejected.

## Execution and Kanban Movement

- Move "Approved" tasks to "Doing" once work is in progress.
- On fulfillment of all acceptance criteria, move the task to "Done".

## Session End, Retrospective, and Agent Learning

- Include a persistent "Session End" task in every session backlog.
- On session end:
  - Prompt user for final confirmation to close session.
  - Agent performs a session review (retro) based on chat/session logs.
  - Write at least one actionable improvement for future sessions into "agent_notes.md".
  - Improvements can be behavioral, project-specific, or tooling-related, and roll forward into future session logic by checking "agent_notes.md" at session start.

## Maintenance & Upstream Compatibility

- Only documentation, logic, and structure relevant to session backlogs should be maintained in your fork.
- Avoid feature bloat; keep upstream compatibility via diffable documentation and minimal essential instruction changes.
- Implement an editable acceptance criteria function (not present in default backlog.md): criteria must be editable prior to approval; edits should not add new criteria but modify or update existing ones.
