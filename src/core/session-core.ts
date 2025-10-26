import { join } from "node:path";
import { BunFile } from "bun";
import { BacklogConfig, Task } from "../types";
import { SessionFileSystem } from "../file-system/session-fs";

export class SessionCore {
  public readonly fs: SessionFileSystem;

  constructor(private readonly cwd: string) {
    this.fs = new SessionFileSystem(this.cwd);
  }

  public async createTask(task: Task): Promise<string> {
    const filePath = await this.fs.saveTask(task);
    return filePath;
  }

  public async getTask(taskId: string): Promise<Task | null> {
    const task = await this.fs.loadTask(taskId);
    return task;
  }

  public async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
    const task = await this.fs.loadTask(taskId);
    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    const updatedTask = { ...task, ...updates };
    await this.fs.saveTask(updatedTask);
    return updatedTask;
  }

  public async deleteTask(taskId: string): Promise<void> {
    await this.fs.deleteTask(taskId);
  }

  public async moveTask(taskId: string, newStatus: "plan" | "approve" | "cancel" | "doing" | "done"): Promise<void> {
    const task = await this.getTask(taskId);
    if (!task) {
      throw new Error(`Task with id ${taskId} not found`);
    }
    task.status = newStatus;
    await this.updateTask(taskId, { status: newStatus });
    const newPath = this.fs.getTaskPath(taskId, newStatus);
    const oldPath = this.fs.getTaskPath(taskId, task.status);
    if (newPath !== oldPath) {
        await this.fs.moveTask(oldPath, newPath);
    }
  }

  public async generateNextId(): Promise<string> {
    const tasks = await this.fs.listTasks();
    const maxId = tasks.reduce((max, task) => {
        const id = parseInt(task.id.split('-')[1]);
        return id > max ? id : max;
    }, 0);
    return `task-${maxId + 1}`;
  }
}
