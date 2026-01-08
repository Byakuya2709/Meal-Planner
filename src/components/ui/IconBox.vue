<template>
  <div :class="iconBoxClasses">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'info', 'neutral'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  rounded: {
    type: String,
    default: 'xl',
    validator: (value) => ['lg', 'xl', '2xl', 'full'].includes(value)
  }
})

const iconBoxClasses = computed(() => {
  const classes = ['inline-flex items-center justify-center flex-shrink-0']

  // Variant colors
  const variantMap = {
    primary: 'bg-primary-100 text-primary-600',
    secondary: 'bg-secondary-100 text-primary-400',
    success: 'bg-green-100 text-green-600',
    warning: 'bg-amber-100 text-amber-600',
    info: 'bg-blue-100 text-blue-600',
    neutral: 'bg-neutral-100 text-neutral-600'
  }
  classes.push(variantMap[props.variant])

  // Size
  const sizeMap = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-16 h-16 text-3xl',
    xl: 'w-20 h-20 text-4xl'
  }
  classes.push(sizeMap[props.size])

  // Rounded
  classes.push(`rounded-${props.rounded}`)

  return classes.join(' ')
})
</script>