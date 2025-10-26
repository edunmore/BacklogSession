# BacklogSession CLI Wrapper

BacklogSession is a CLI wrapper that creates an isolated session workspace for Backlog.md operations. It creates a `backlogsession` directory in the current working directory, then delegates all commands to the core `backlog` CLI while providing session-specific functionality.

## Features

- **Session Isolation**: Creates and operates within a dedicated `backlogsession` directory in the current working directory
- **Transparent Delegation**: All commands are passed through to the core backlog CLI
- **Config Patching**: On `init`, automatically updates column statuses to: Plan, Approve, Cancel, Doing, Done
- **Output Proxy**: Maintains all stdout, stderr, and exit code transparency

## Usage

```bash
# Basic command delegation (creates backlogsession in current directory)
cd /path/to/my/project
backlogsession task create "My task"
backlogsession board
backlogsession config list

# Initialization with custom columns
backlogsession init my-project --defaults
```

## How It Works

1. Creates `backlogsession` directory in the **current working directory** where the command is run
2. All backlog operations are executed within this session directory
3. Delegates all commands to the core backlog CLI
4. For `init` command, patches the config to use custom columns after initialization

## Column Configuration

When running `backlogsession init`, the configuration is automatically patched to use these columns:
- Plan
- Approve
- Cancel
- Doing
- Done

This supports a workflow that includes approval processes and cancellation states.