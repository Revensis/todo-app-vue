<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'

export default defineComponent({
  name: 'CreateTask',
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    statusOptions: {
      type: Array as () => string[],
      required: true,
    },
  },
  emits: ['create', 'close'],
  setup(props, { emit }) {
    const internalDialog = ref(props.dialog)
    const newTask = ref({
      title: '',
      description: '',
      status: props.statusOptions[0] || 'à faire',
    })

    const isFormValid = computed(() => {
      return newTask.value.title.trim() !== '' && newTask.value.description.trim() !== ''
    })

    watch(() => props.dialog, (newVal) => {
      internalDialog.value = newVal
    })

    watch(internalDialog, (val) => {
      if (!val) {
        emit('close')
      }
    })

    const createTask = () => {
      emit('create', newTask.value)
      internalDialog.value = false
    }

    const cancel = () => {
      internalDialog.value = false
      emit('close')
    }

    return {
      internalDialog,
      newTask,
      isFormValid,
      createTask,
      cancel,
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
      <v-card-title>Créer une tache</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="newTask.title"
          label="Titre"
          required
        />
        <v-textarea
          v-model="newTask.description"
          label="Description"
          required
        />
        <v-select
          v-model="newTask.status"
          label="Statut"
          :items="statusOptions"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="cancel"
        >
          Annuler
        </v-btn>
        <v-btn
          color="primary"
          text
          :disabled="!isFormValid"
          @click="createTask"
        >
          Sauvegarder
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

