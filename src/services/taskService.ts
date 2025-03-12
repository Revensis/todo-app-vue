import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getAllTasks() {
    return apiClient.get('/tasks');
  },
  getTask(id: string) {
    return apiClient.get(`/tasks/${id}`);
  },
  createTask(taskData: unknown) {
    return apiClient.post('/tasks', taskData);
  },
  updateTask(id: string, taskData: unknown) {
    return apiClient.patch(`/tasks/${id}`, taskData);
  },
  deleteTask(id: string) {
    return apiClient.delete(`/tasks/${id}`);
  },
};
