<script setup>
defineProps({ task: { type: Object, required: true } })
defineEmits(['edit', 'delete'])

const statusClass = {
  'todo':        'text-gray-500',
  'in-progress': 'text-yellow-600',
  'done':        'text-green-600',
}
const statusLabel = {
  'todo':        'To Do',
  'in-progress': 'In Progress',
  'done':        'Done',
}
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-xl p-4">
    <div class="mb-2">
      <span :class="['text-xs font-medium', statusClass[task.status]]">
        {{ statusLabel[task.status] }}
      </span>
      <h3 class="font-semibold text-gray-900">{{ task.title }}</h3>
    </div>

    <p v-if="task.description" class="text-sm text-gray-500 mb-3">{{ task.description }}</p>

    <div class="flex gap-2">
      <button @click="$emit('edit', task)"
        class="text-xs text-brand-600 hover:underline">Edit</button>
      <button @click="$emit('delete', task.id)"
        class="text-xs text-red-500 hover:underline">Delete</button>
    </div>
  </div>
</template>
