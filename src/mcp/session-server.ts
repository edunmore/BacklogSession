import { SessionCore } from '../core/session-core';
import { McpServer } from './server';
import { McpRequest, McpResponse } from './types';

export class SessionMcpServer extends McpServer {
  private readonly sessionCore: SessionCore;

  constructor(cwd: string) {
    super(cwd);
    this.sessionCore = new SessionCore(cwd);
    this.registerHandlers();
  }

  private registerHandlers() {
    this.handlers['session-backlog/createTask'] = this.createTask.bind(this);
    this.handlers['session-backlog/getTask'] = this.getTask.bind(this);
    this.handlers['session-backlog/updateTask'] = this.updateTask.bind(this);
    this.handlers['session-backlog/deleteTask'] = this.deleteTask.bind(this);
    this.handlers['session-backlog/moveTask'] = this.moveTask.bind(this);
  }

  private async createTask(request: McpRequest): Promise<McpResponse> {
    const task = request.params as any;
    const taskId = await this.sessionCore.createTask(task);
    return { result: { taskId } };
  }

  private async getTask(request: McpRequest): Promise<McpResponse> {
    const { taskId } = request.params as any;
    const task = await this.sessionCore.getTask(taskId);
    return { result: { task } };
  }

  private async updateTask(request: McpRequest): Promise<McpResponse> {
    const { taskId, updates } = request.params as any;
    const task = await this.sessionCore.updateTask(taskId, updates);
    return { result: { task } };
  }

  private async deleteTask(request: McpRequest): Promise<McpResponse> {
    const { taskId } = request.params as any;
    await this.sessionCore.deleteTask(taskId);
    return { result: { success: true } };
  }

  private async moveTask(request: McpRequest): Promise<McpResponse> {
      const { taskId, newStatus } = request.params as any;
      await this.sessionCore.moveTask(taskId, newStatus);
      return { result: { success: true } };
  }
}
