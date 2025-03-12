<script lang="ts">
import { defineComponent } from 'vue'

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

export default defineComponent({
  name: 'TaskCard',
  props: {
    task: {
      type: Object as () => Task,
      required: true,
    },
  },
})
</script>

<template>
  <v-card
    height="200"
    class="pa-4"
  >
    <v-card-title>{{ task.title }}</v-card-title>
    <v-card-text>
      {{ task.description }}
      <div>Statut: <strong>{{ task.status }}</strong></div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="primary"
        @click.stop="$emit('delete', task._id)"
      >
        Supprimer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

