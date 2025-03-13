import axios, {type AxiosResponse} from 'axios';
import type {Task} from "@/types/task";

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getAllTasks(params: Record<string, string>) {
    return apiClient.get('/tasks', { params });
  },
  getTask(id: string) {
    return apiClient.get(`/tasks/${id}`);
  },
  createTask(taskData:Record<string, string>) {
    return apiClient.post('/tasks', taskData);
  },
  updateTask(id: string, taskData: Partial<Task>): Promise<AxiosResponse<Task>> {
    return apiClient.patch(`/tasks/${id}`, taskData);
  },
  deleteTask(id: string) {
    return apiClient.delete(`/tasks/${id}`);
  },
};
