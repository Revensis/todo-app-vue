<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import TaskCard from '@/components/tasks/TaskCard.vue'
import CreateTask from '@/components/tasks/CreateTask.vue'
import ModalTask from '@/components/tasks/ModalTask.vue'
import taskService from '@/services/taskService'
import type { Task } from '@/types/task'
import router from "@/router";

export default defineComponent({
  name: 'Tasks',
  components: { TaskCard, CreateTask, ModalTask },
  setup() {
    const tasks = ref<Task[]>([])
    const createDialog = ref(false)
    const editDialog = ref(false)
    const selectedTask = ref<Task | null>(null)
    const statusOptions = ['à faire', 'en cours', 'terminée']
    const userId = computed(() => localStorage.getItem('userId') || '');


    const fetchTasks = async () => {
      try {
        const response = await taskService.getAllTasks({ userId: userId.value });
        tasks.value = response.data as Task[];
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const openCreateDialog = () => {
      createDialog.value = true
    }
    const closeCreateDialog = () => {
      createDialog.value = false
    }
    const createTask = async (taskData: Omit<Task, '_id'>) => {
      try {
        await taskService.createTask({
          ...taskData,
          userId: userId.value
        });
        closeCreateDialog();
        await fetchTasks();
      } catch (error) {
        console.error('Error creating task:', error)
      }
    }

    const openEditDialog = (task: Task) => {
      selectedTask.value = { ...task }
      editDialog.value = true
    }
    const closeEditDialog = () => {
      editDialog.value = false
      selectedTask.value = null
    }
    const updateTask = async (updatedTask: Task) => {
      try {
        await taskService.updateTask(updatedTask._id, updatedTask)
        closeEditDialog()
        await fetchTasks()
      } catch (error) {
        console.error('Error updating task:', error)
      }
    }
    const handleDelete = async (id: string) => {
      try {
        await taskService.deleteTask(id)
        await fetchTasks()
      } catch (error) {
        console.error('Error deleting task:', error)
      }
    }

    const logout = () => {
      localStorage.removeItem('userId');
      router.push({ name: 'Login' });
    };

    onMounted(fetchTasks)

    return {
      tasks,
      createDialog,
      openCreateDialog,
      closeCreateDialog,
      createTask,
      editDialog,
      openEditDialog,
      closeEditDialog,
      updateTask,
      selectedTask,
      handleDelete,
      statusOptions,
      userId,
      logout,
    }
  },
})
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Todo List de {{ userId }}</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        @click="openCreateDialog"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="logout"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="task in tasks"
            :key="task._id"
            cols="12"
            md="4"
          >
            <v-card @click="openEditDialog(task)">
              <TaskCard
                :task="task"
                @delete="handleDelete"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    
    <CreateTask
      v-if="createDialog"
      :dialog="createDialog"
      :status-options="statusOptions"
      @create="createTask"
      @close="closeCreateDialog"
    />
    
    <ModalTask
      v-if="editDialog"
      :dialog="editDialog"
      :task="selectedTask"
      :status-options="statusOptions"
      @update="updateTask"
      @close="closeEditDialog"
    />
  </v-app>
</template>


