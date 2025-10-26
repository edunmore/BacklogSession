import { Command } from "commander";
import { SessionCore } from "../core/session-core";
import { formatTaskPlainText } from "../formatters/task-plain-text";

export function registerSessionBacklogCommand(program: Command) {
    const sessionBacklogCmd = program.command("sessionbacklog").description("Manage the session backlog");

    sessionBacklogCmd
        .command("create <title>")
        .option("-d, --description <text>", "task description")
        .option("-a, --assignee <assignee>")
        .option("-l, --labels <labels>")
        .option("--ac <criteria>", "add acceptance criteria (can be used multiple times)")
        .action(async (title: string, options) => {
            const cwd = process.cwd();
            const core = new SessionCore(cwd);
            const id = await core.generateNextId();
            const task = {
                id,
                title,
                status: "plan",
                description: options.description || "",
                assignee: options.assignee ? [options.assignee] : [],
                labels: options.labels ? options.labels.split(",").map((l: string) => l.trim()) : [],
                acceptanceCriteriaItems: options.ac ? [{text: options.ac, checked: false, index: 1}] : [],
                createdDate: new Date().toISOString()
            };

            const filepath = await core.createTask(task);
            console.log(`Created task ${id} in plan`);
            console.log(`File: ${filepath}`);
        });

    sessionBacklogCmd
        .command("view <taskId>")
        .action(async (taskId: string) => {
            const cwd = process.cwd();
            const core = new SessionCore(cwd);
            const task = await core.getTask(taskId);

            if (!task) {
                console.error(`Task ${taskId} not found.`);
                return;
            }

            console.log(formatTaskPlainText(task));
        });

    sessionBacklogCmd
        .command("list")
        .option("-s, --status <status>", "filter by status (plan, approve, cancel, doing, done)")
        .action(async (options) => {
            const cwd = process.cwd();
            const core = new SessionCore(cwd);
            const tasks = await core.fs.listTasks();

            let filteredTasks = tasks;
            if (options.status) {
                filteredTasks = tasks.filter(t => t.status === options.status);
            }

            for (const task of filteredTasks) {
                console.log(`${task.id} - ${task.title} [${task.status}]`);
            }
        });

    sessionBacklogCmd
        .command("move <taskId> <status>")
        .action(async (taskId: string, status: "plan" | "approve" | "cancel" | "doing" | "done") => {
            const cwd = process.cwd();
            const core = new SessionCore(cwd);
            try {
                await core.moveTask(taskId, status);
                console.log(`Moved task ${taskId} to ${status}`);
            } catch (error) {
                console.error(error.message);
            }
        });

    sessionBacklogCmd
        .command("start-mcp")
        .description("Start the session backlog MCP server")
        .action(async () => {
            const { SessionMcpServer } = await import("../mcp/session-server");
            const server = new SessionMcp-Server(process.cwd());
            await server.start();
        });
}
