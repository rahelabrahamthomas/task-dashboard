<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('admin@taskapp.com')
const password = ref('password123')
const error = ref('')

async function handleLogin() {
  error.value = ''
  try {
    await auth.login(email.value, password.value)
    router.push({ name: 'dashboard' })
  } catch {
    error.value = 'Invalid email or password.'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white rounded-xl shadow p-8 w-full max-w-sm">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Sign in</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" required
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" required
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

        <button type="submit"
          class="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 rounded-lg transition">
          Sign in
        </button>
      </form>

    </div>
  </div>
</template>
