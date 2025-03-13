<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  setup() {
    const userId = ref<string>('')
    const router = useRouter()

    const login = () => {
      localStorage.setItem('userId', userId.value)
      router.push({ name: 'Tasks' })
    }

    onMounted(() => {
      localStorage.removeItem('userId')
    })

    return { userId, login }
  },
})
</script>

<template>
  <v-container>
    <v-form @submit.prevent="login">
      <v-text-field v-model="userId" label="Entrez votre identifiant" required />
      <v-btn type="submit" color="primary">Connexion</v-btn>
    </v-form>
  </v-container>
</template>


