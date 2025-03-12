<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import TaskCard from './components/tasks/TaskCard.vue'
import ModalTask from './components/tasks/ModalTask.vue'
import taskService from './services/taskService'
import type { Task } from "./types/task";

export default defineComponent({
  name: 'App',
  components: { TaskCard, ModalTask },
  setup() {
    const tasks = ref<Task[]>([])
    const dialog = ref(false)
    const selectedTask = ref<Task | null>(null)
    const statusOptions = ['à faire', 'en cours', 'terminée']

    const fetchTasks = async () => {
      try {
        const response = await taskService.getAllTasks()
        tasks.value = response.data
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    }

    const openEditDialog = (task: Task) => {
      selectedTask.value = { ...task }
      dialog.value = true
    }

    const closeDialog = () => {
      dialog.value = false
      selectedTask.value = null
    }

    const updateTask = async (updatedTask: Task) => {
      try {
        await taskService.updateTask(updatedTask._id, updatedTask)
        closeDialog()
        fetchTasks()
      } catch (error) {
        console.error("Error updating task:", error)
      }
    }

    const handleDelete = async (id: string) => {
      try {
        await taskService.deleteTask(id)
        fetchTasks()
      } catch (error) {
        console.error("Error deleting task:", error)
      }
    }

    onMounted(fetchTasks)

    return {
      tasks,
      dialog,
      selectedTask,
      statusOptions,
      openEditDialog,
      closeDialog,
      updateTask,
      handleDelete,
    }
  },
})
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Ma Todo List</v-toolbar-title>
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
              <TaskCard :task="task" @delete="handleDelete" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <ModalTask
        v-if="selectedTask"
        :dialog="dialog"
        :task="selectedTask"
        :statusOptions="statusOptions"
        @update="updateTask"
        @close="closeDialog"
    />
  </v-app>
</template>
