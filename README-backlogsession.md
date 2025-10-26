# BacklogSession

BacklogSession is an isolated session wrapper for [Backlog.md](https://backlog.md) that creates a dedicated workspace for your project management tasks with custom column workflow.

## Features

- **Session Isolation**: Creates a dedicated `backlogsession` directory in your current working directory
- **Custom Workflow Columns**: Plan, Approve, Cancel, Doing, Done
- **Transparent CLI Wrapper**: All standard `backlog` commands work seamlessly
- **MCP Server Support**: Dedicated session MCP server for AI assistant integration

## Installation

### Global Installation (Recommended)

```bash
# Install globally using bun (recommended)
bun install -g backlog.md

# Or install globally using npm
npm install -g backlog.md
```

### Project-Specific Installation

```bash
# Install as a project dependency
bun add backlog.md
# or
npm install --save-dev backlog.md
```

## Quick Start

### Basic Usage

```bash
# Navigate to your project directory
cd /path/to/your/project

# Initialize a backlogsession with custom columns
backlogsession init my-project --defaults

# Create tasks with custom workflow
backlogsession task create "My task" --status Plan
backlogsession task create "Approve this" --status Approve
backlogsession task create "Cancel if needed" --status Cancel
backlogsession task create "Do this task" --status Doing
backlogsession task create "Completed task" --status Done

# View your tasks
backlogsession task list --plain
backlogsession board
```

### Command Reference

All standard `backlog` commands work with `backlogsession`:

```bash
# Task management
backlogsession task create "My task" --status Plan
backlogsession task list
backlogsession task edit task-1 --status Approve
backlogsession task view task-1

# Project management
backlogsession init my-project --defaults
backlogsession config list
backlogsession board

# Documentation and decisions
backlogsession doc create "Project documentation"
backlogsession decision create "Technical decision"
```

## MCP Server Configuration

BacklogSession includes a dedicated MCP server for AI assistant integration with the same session isolation and custom workflow columns.

### Starting the MCP Server

The session MCP server creates a `backlogsession` directory in your current working directory and operates within that isolated context:

```bash
# Navigate to where you want the backlogsession directory
cd /path/to/your/project

# Start the session MCP server
backlog session-mcp start

# Or use the alternative command
backlog session-mcp-start
```

### Editor Configuration

#### Claude Code (Anthropic)

After starting the session MCP server, configure Claude Code to connect to your session:

```bash
claude mcp add my-session-backlog -- backlog session-mcp start
```

#### Other MCP-Compatible Editors

Most MCP-compatible editors will allow you to configure the server by running:
```
backlog session-mcp start
```

The server will automatically:
- Create a `backlogsession` directory in your current working directory
- Apply custom columns (Plan, Approve, Cancel, Doing, Done)
- Operate within the session context for all operations

### MCP Server Capabilities

The session MCP server provides the same capabilities as the standard backlog MCP server but with session isolation:

- **Tools**: Task creation, editing, listing, and management
- **Resources**: Project configuration, task details, workflow overview
- **Prompts**: Context-aware task management guidance
- **Custom Columns**: All operations use Plan, Approve, Cancel, Doing, Done columns

## Workflow Columns

The custom workflow supports these columns:

- **Plan**: Tasks in planning stage
- **Approve**: Tasks requiring approval
- **Cancel**: Tasks that should be cancelled
- **Doing**: Tasks currently in progress
- **Done**: Completed tasks

## Directory Structure

When you run any backlogsession command in a directory:

```
your-project/
├── backlogsession/          # Session workspace
│   ├── backlog/            # Backlog data
│   │   ├── config.yml      # Config with custom columns
│   │   ├── tasks/          # Task files
│   │   ├── docs/           # Documentation
│   │   └── decisions/      # Decisions
│   └── ...                 # Other backlog files
```

## Comparison

| Command | Directory | Columns | Purpose |
|---------|-----------|---------|---------|
| `backlog` | Current dir | To Do, In Progress, Done | Standard workflow |
| `backlogsession` | `backlogsession/` subdirectory | Plan, Approve, Cancel, Doing, Done | Isolated session with custom workflow |

## Best Practices

1. **Use in project directories** where you want session isolation
2. **Initialize once per project** with `backlogsession init`
3. **Commit only the parent directory** - the `backlogsession` directory can be gitignored if needed
4. **Start MCP server in the same directory** where you want the session to exist

## Troubleshooting

### MCP Server Connection Issues

If your editor cannot connect to the MCP server:

1. Ensure the server is running: `backlog session-mcp start`
2. Verify you're in the correct directory where you want the session
3. Check that no other MCP servers are running on the same transport

### Session Directory Not Created

If the `backlogsession` directory is not created:

1. Ensure you have write permissions in the current directory
2. Check that there are no permission or disk space issues
3. Try running the command again

## License

MIT - See the main Backlog.md project for licensing information.