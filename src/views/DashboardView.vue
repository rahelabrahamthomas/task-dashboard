<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '../stores/tasks'
import { useAuthStore } from '../stores/auth'
import TaskCard from '../components/TaskCard.vue'
import TaskForm from '../components/TaskForm.vue'

const router = useRouter()
const taskStore = useTaskStore()
const auth = useAuthStore()

const showForm = ref(false)
const editingTask = ref(null)

onMounted(() => taskStore.fetchTasks())

function openCreate() {
  editingTask.value = null
  showForm.value = true
}

function openEdit(task) {
  editingTask.value = task
  showForm.value = true
}

async function handleSubmit(payload) {
  if (editingTask.value) {
    await taskStore.updateTask(editingTask.value.id, payload)
  } else {
    await taskStore.addTask(payload)
  }
  showForm.value = false
}

async function handleDelete(id) {
  if (window.confirm('Delete this task?')) {
    await taskStore.deleteTask(id)
  }
}

function logout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between">
      <h1 class="font-bold text-gray-900">TaskDash</h1>
      <div class="flex items-center gap-4">
        <button @click="logout" class="text-sm text-red-500 hover:underline">Sign out</button>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-900">My Tasks</h2>
        <button @click="openCreate"
          class="bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
          + New Task
        </button>
      </div>

      <p v-if="taskStore.loading" class="text-gray-500 text-sm">Loading...</p>

      <p v-else-if="taskStore.tasks.length === 0" class="text-gray-400 text-sm">
        No tasks yet. Create one to get started.
      </p>

      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <TaskCard
          v-for="task in taskStore.tasks"
          :key="task.id"
          :task="task"
          @edit="openEdit"
          @delete="handleDelete"
        />
      </div>
    </main>

    <TaskForm :open="showForm" :task="editingTask" @close="showForm = false" @submit="handleSubmit" />
  </div>
</template>
