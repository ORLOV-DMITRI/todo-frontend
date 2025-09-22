import api from "@/lib/settings/axios";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
}

export interface UpdateTaskData {
  title: string;
}

export type TaskStatus = 'all' | 'active' | 'completed';

export const tasksService = {
  async getTasks(status?: TaskStatus): Promise<Task[]> {
    const params = status && status !== 'all' ? { status } : {};
    const response = await api.get('/api/tasks', { params });
    return response.data.tasks;
  },

  async createTask(data: CreateTaskData): Promise<Task> {
    const response = await api.post('/api/tasks', data);
    return response.data.task;
  },

  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    const response = await api.put(`/api/tasks/${id}`, data);
    return response.data.task;
  },

  async toggleTask(id: string): Promise<Task> {
    const response = await api.patch(`/api/tasks/${id}/toggle`);
    return response.data.task;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/api/tasks/${id}`);
  },

  async getTask(id: string): Promise<Task> {
    const response = await api.get(`/api/tasks/${id}`);
    return response.data.task;
  },
};