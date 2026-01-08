<template>
  <button
    type="button"
    :class="cardClasses"
    @click="handleClick"
  >
    <div class="text-4xl mb-2">{{ ingredient.icon }}</div>
    <span class="text-sm font-medium">{{ ingredient.name }}</span>
    
    <div v-if="selected" class="absolute top-2 right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
      <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  ingredient: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const cardClasses = computed(() => {
  const base = [
    'relative flex flex-col items-center justify-center',
    'p-4 rounded-2xl border-2 transition-all duration-200',
    'hover:shadow-md hover:-translate-y-1',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
  ]

  if (props.selected) {
    base.push('border-primary-600 bg-primary-50 shadow-md')
  } else {
    base.push('border-neutral-200 bg-white hover:border-primary-300')
  }

  return base.join(' ')
})

const handleClick = () => {
  emit('click', props.ingredient)
}
</script>