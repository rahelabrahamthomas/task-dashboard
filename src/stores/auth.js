import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '../api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  const isAuthenticated = computed(() => !!user.value)

  async function login(email, password) {
    const data = await authApi.login(email, password)
    user.value = { id: data.id, name: data.name, email: data.email }
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  return { user, isAuthenticated, login, logout }
})
