import { defineStore } from 'pinia'
import { ref } from 'vue'
import { tasksApi } from '../api'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([])
  const loading = ref(false)

  async function fetchTasks() {
    loading.value = true
    tasks.value = await tasksApi.getAll()
    loading.value = false
  }

  async function addTask(payload) {
    await tasksApi.create({ ...payload })
    await fetchTasks()
  }

  async function updateTask(id, payload) {
    await tasksApi.update(id, { id, ...payload })
    await fetchTasks()
  }

  async function deleteTask(id) {
    await tasksApi.remove(id)
    await fetchTasks()
  }

  return { tasks, loading, fetchTasks, addTask, updateTask, deleteTask }
})
