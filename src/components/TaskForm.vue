<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, required: true },
  task: { type: Object, default: null },
})
const emit = defineEmits(['close', 'submit'])

const title = ref('')
const description = ref('')
const status = ref('todo')

watch(() => props.open, (val) => {
  if (val) {
    title.value       = props.task?.title       || ''
    description.value = props.task?.description || ''
    status.value      = props.task?.status      || 'todo'
  }
})

function handleSubmit() {
  if (!title.value.trim()) return
  emit('submit', { title: title.value.trim(), description: description.value.trim(), status: status.value })
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      @click.self="$emit('close')">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 class="font-semibold text-gray-900 mb-4">{{ task ? 'Edit Task' : 'New Task' }}</h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input v-model="title" type="text" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="description" rows="3"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select v-model="status"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div class="flex gap-2 pt-1">
            <button type="button" @click="$emit('close')"
              class="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" :disabled="!title.trim()"
              class="flex-1 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white py-2 rounded-lg text-sm transition">
              {{ task ? 'Save' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>
