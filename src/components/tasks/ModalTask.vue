<script lang="ts">
import { defineComponent, ref, watch } from 'vue'


export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

export default defineComponent({
  name: 'ModalTask',
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    task: {
      type: Object as () => Task | null,
      required: true,
    },
    statusOptions: {
      type: Array as () => string[],
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

    const isFormValid = computed(() => {
      return (localTask.value.title || '').trim() !== '' && (localTask.value.description || '').trim() !== ''})

    const saveEdit = () => {
      if (!isFormValid.value) return
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
      isFormValid,
      saveEdit,
      cancelEdit,
    }
  },
})
</script>

<template>
  <v-dialog
    v-model="internalDialog"
    max-width="500"
  >
    <v-card>
      <v-card-title>Modifier la tâche</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="localTask.title"
          label="Titre"
        />
        <v-textarea
          v-model="localTask.description"
          label="Description"
        />
        <v-select
          v-model="localTask.status"
          label="Statut"
          :items="statusOptions"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="cancelEdit"
        >
          Annuler
        </v-btn>
        <v-btn
          color="primary"
          text
          :disabled="!isFormValid"
          @click="saveEdit"
        >
          Sauvegarder
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>



