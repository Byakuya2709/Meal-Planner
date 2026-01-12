<!-- src/components/ui/BaseButton.vue - REFACTORED -->
<template>
  <component
    :is="tag"
    :type="tag === 'button' ? type : undefined"
    :to="tag === 'router-link' ? to : undefined"
    :href="tag === 'a' ? href : undefined"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <span v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    <span :class="{ 'opacity-0': loading }">
      <slot />
    </span>
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'accent', 'outline', 'ghost', 'danger', 'link'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  type: {
    type: String,
    default: 'button'
  },
  tag: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'a', 'router-link'].includes(value)
  },
  to: {
    type: [String, Object],
    default: undefined
  },
  href: {
    type: String,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  const classes = [
    'relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ]

  // Variant styles - Tuân thủ quy tắc 60-30-10
  const variantClasses = {
    // Primary: màu chính cho nội dung (30%)
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm hover:shadow-md',
    
    // Secondary: màu phụ cho layout (60%)
    secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 focus:ring-secondary-500 border border-secondary-200',
    
    // Accent: màu nhấn CHỈ CHO CTA (10%)
    accent: 'bg-accent-400 text-white hover:bg-accent-500 focus:ring-accent-500 shadow-md hover:shadow-lg',
    
    // Outline
    outline: 'border-2 border-primary-500 text-primary-700 bg-white hover:bg-primary-50 focus:ring-primary-500',
    
    // Ghost
    ghost: 'text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-500',
    
    // Danger
    danger: 'bg-error text-white hover:bg-error/90 focus:ring-error shadow-sm hover:shadow-md',
    
    // Link
    link: 'text-primary-600 hover:text-primary-700 underline focus:ring-primary-500'
  }
  classes.push(variantClasses[props.variant])

  // Size styles
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  }
  classes.push(sizeClasses[props.size])

  // Full width
  if (props.fullWidth) {
    classes.push('w-full')
  }

  return classes.join(' ')
})

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>