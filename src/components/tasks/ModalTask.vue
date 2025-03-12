<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'ModalTask',
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
    statusOptions: {
      type: Array,
      required: true,
    },
  },
  emits: ['update', 'close'],
  setup(props, { emit }) {
    const localTask = ref({ ...props.task })
    const internalDialog = ref(props.dialog)

    watch(
        () => props.task,
        (newTask) => {
          localTask.value = { ...newTask }
        },
        { immediate: true }
    )

    watch(
        () => props.dialog,
        (newVal) => {
          internalDialog.value = newVal
        }
    )

    watch(internalDialog, (val) => {
      if (!val) {
        emit('close')
      }
    })

    const saveEdit = () => {
      emit('update', localTask.value)
      internalDialog.value = false
    }

    const cancelEdit = () => {
      internalDialog.value = false
      emit('close')
    }

    return {
      internalDialog,
      localTask,
      saveEdit,
      cancelEdit,
    }
  },
})
</script>

<template>
  <v-dialog v-model="internalDialog" max-width="500">
    <v-card>
      <v-card-title>Modifier la tâche</v-card-title>
      <v-card-text>
        <v-text-field label="Titre" v-model="localTask.title" />
        <v-textarea label="Description" v-model="localTask.description" />
        <v-select
            label="Statut"
            :items="statusOptions"
            v-model="localTask.status"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="cancelEdit">Annuler</v-btn>
        <v-btn color="primary" text @click="saveEdit">Sauvegarder</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>



