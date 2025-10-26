import { join } from "node:path";
import { BunFile } from "bun";
import { Task, BacklogConfig } from "../types";
import { markdown } from "../markdown";

export class SessionFileSystem {
  private readonly sessionBacklogDir: string;
  private readonly planDir: string;
  private readonly approveDir: string;
  private readonly cancelDir: string;
  private readonly doingDir: string;
  private readonly doneDir: string;

  constructor(private readonly cwd: string) {
    this.sessionBacklogDir = join(this.cwd, "session_backlog");
    this.planDir = join(this.sessionBacklogDir, "plan");
    this.approveDir = join(this.sessionBacklogDir, "approve");
    this.cancelDir = join(this.sessionBacklogDir, "cancel");
    this.doingDir = join(this.sessionBacklogDir, "doing");
    this.doneDir = join(this.sessionBacklogDir, "done");
  }

  public async saveTask(task: Task): Promise<string> {
    const content = markdown.stringify(task);
    const filePath = this.getTaskPath(task.id, task.status as any);
    await Bun.write(filePath, content);
    return filePath;
  }

  public async loadTask(taskId: string): Promise<Task | null> {
    const filePath = await this.findTaskFile(taskId);
    if (!filePath) {
      return null;
    }
    const content = await Bun.file(filePath).text();
    const task = markdown.parse(content) as Task;
    return task;
  }

  public async deleteTask(taskId: string): Promise<void> {
    const filePath = await this.findTaskFile(taskId);
    if (filePath) {
      await Bun.file(filePath).unlink();
    }
  }

  public async listTasks(): Promise<Task[]> {
    const allTasks: Task[] = [];
    for (const dir of [this.planDir, this.approveDir, this.cancelDir, this.doingDir, this.doneDir]) {
        const files = await this.getFilesInDir(dir);
        for (const file of files) {
            const task = await this.loadTask(file);
            if(task) allTasks.push(task);
        }
    }
    return allTasks;
  }

  private async getFilesInDir(dir: string): Promise<string[]> {
    const entries = await new Bun.Glob("*").scan(dir);
    return Array.from(entries);
  }

  private async findTaskFile(taskId: string): Promise<string | null> {
    for (const dir of [this.planDir, this.approveDir, this.cancelDir, this.doingDir, this.doneDir]) {
      const filePath = join(dir, `${taskId}.md`);
      if (await Bun.file(filePath).exists()) {
        return filePath;
      }
    }
    return null;
  }

  public getTaskPath(taskId: string, status: "plan" | "approve" | "cancel" | "doing" | "done"): string {
    let dir: string;
    switch (status) {
      case "plan":
        dir = this.planDir;
        break;
      case "approve":
        dir = this.approveDir;
        break;
      case "cancel":
        dir = this.cancelDir;
        break;
      case "doing":
        dir = this.doingDir;
        break;
      case "done":
        dir = this.doneDir;
        break;
      default:
        throw new Error(`Invalid status: ${status}`);
    }
    return join(dir, `${taskId}.md`);
  }

  public async moveTask(oldPath: string, newPath: string): Promise<void> {
      await Bun.write(newPath, await Bun.file(oldPath).text());
      await Bun.file(oldPath).unlink();
  }
}
