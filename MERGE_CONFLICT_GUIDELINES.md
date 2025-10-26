# BacklogSession Merge Conflict Guidelines

This document provides guidance for resolving potential merge conflicts when updating the upstream Backlog.md project with the BacklogSession changes.

## Overview

BacklogSession adds isolated session functionality to Backlog.md with custom workflow columns (Plan, Approve, Cancel, Doing, Done). It includes a CLI wrapper and MCP endpoint that create session directories in the current working directory rather than the project root.

## Key Files and Conflict Risks

### 1. `src/cli.ts` - HIGH RISK
**Location**: End of file around MCP command registration
**Change**: Added SessionMCP command registration
**Potential Conflicts**: If upstream adds new MCP functionality or reorganizes commands

**Expected Changes**:
```javascript
// Import added
import { registerSessionMcpCommand } from "./commands/session-mcp.ts";

// Registration added
registerSessionMcpCommand(program);
```

**Merge Guidance**:
- Always preserve both `registerMcpCommand(program)` and `registerSessionMcpCommand(program)`
- If upstream reorganizes MCP commands, place SessionMCP registration in the same area
- Ensure both command groups remain functional

### 2. `src/mcp/session-server.ts` - MEDIUM RISK
**Purpose**: MCP server for session functionality with custom workflow
**Conflict Risk**: If upstream changes MCP framework or Core class

**Key Aspects to Preserve**:
- Extends `Core` class for session functionality
- Creates `backlogsession` directory in current working directory
- Applies custom columns: ["Plan", "Approve", "Cancel", "Doing", "Done"]
- Follows same MCP patterns as original server

### 3. Config File Handling - MEDIUM RISK
**Files**: Code that looks for `backlog/config.yml`
**Location**: Both `backlogsession.js` and `src/mcp/session-server.ts`
**Conflict Risk**: If upstream changes config file format/location

**Expected Behavior**:
- Look for config at `backlog/config.yml` within session directory
- Apply custom statuses to existing config without replacing other settings
- Maintain backward compatibility with existing config options

## Conflict Resolution Strategies

### 1. CLI Command Registration Conflicts
If the MCP registration area changes:
```
RESOLUTION: Ensure both original MCP and SessionMCP commands are registered
PRIORITY: High - both must work
```

### 2. Core Class Changes
If the Core class hierarchy changes:
```
RESOLUTION: Update SessionMcpServer to match new Core interface
PRIORITY: High - MCP functionality must be preserved
```

### 3. Config Schema Changes
If config format changes:
```
RESOLUTION: Preserve custom column functionality while supporting new schema
PRIORITY: Medium - core functionality should be maintained
```

## Safe Changes Areas

### 1. Files Safe to Update from Upstream
- All files in `src/core/`, `src/utils/`, `src/file-system/` (unless Core base class changes)
- `scripts/` directory files (unless affecting CLI execution)
- Most of `src/cli.ts` (except MCP registration area)

### 2. New Files (No Conflict Risk)
- `backlogsession.js` - Independent CLI wrapper
- `src/commands/session-mcp.ts` - Independent command module
- `src/test/backlogsession.test.ts` - Independent test suite
- Documentation files: `BACKLOGSESSION.md`, `README-backlogsession.md`

## Critical Functionality to Preserve

### 1. Session Isolation
- `backlogsession` directory must be created in current working directory
- All operations must occur within the session context
- Configuration must be isolated to the session

### 2. Custom Workflow Columns
- Statuses must remain: ["Plan", "Approve", "Cancel", "Doing", "Done"]
- This workflow must be applied during init operations
- Existing backlog functionality must remain unchanged

### 3. MCP Endpoint Behavior
- Session MCP server must create directory in current working directory
- Must apply custom columns automatically during initialization
- Must maintain same interface as original MCP server

## Testing After Merge Resolution

Always run these tests after resolving conflicts:

1. **Basic functionality**:
```bash
backlogsession --version
backlogsession --help
```

2. **Directory creation**:
```bash
cd /tmp/test && mkdir test && cd test
backlogsession task create "test" --status Plan
ls -la  # Should show backlogsession directory
```

3. **Config patching**:
```bash
cd /tmp/test2 && git init
backlogsession init test-project --defaults
cat backlogsession/backlog/config.yml | grep statuses
# Should show: statuses: [Plan, Approve, Cancel, Doing, Done]
```

4. **Command delegation**:
```bash
backlogsession task list --plain
# Should work within session context
```

5. **MCP server registration**:
```bash
backlog session-mcp --help
# Should show the session MCP command
```

## Rollback Strategy

If conflicts cannot be resolved:
1. Temporarily remove the session MCP registration from `src/cli.ts`
2. Preserve all new functionality in separate files
3. Recreate integration after resolving upstream changes

## Author Notes

- The implementation follows the adapter pattern to minimize core changes
- New functionality is isolated in separate modules
- The original backlog functionality remains completely unchanged
- All session-specific logic is contained in the dedicated session classes