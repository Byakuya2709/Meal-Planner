<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h3 v-if="title" class="text-xl font-semibold text-neutral-900">
          {{ title }}
        </h3>
      </slot>
    </div>
    
    <div :class="['card-body', { 'p-0': noPadding }]">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'bordered', 'elevated', 'flat'].includes(value)
  },
  noPadding: {
    type: Boolean,
    default: false
  },
  hoverable: {
    type: Boolean,
    default: false
  }
})

const cardClasses = computed(() => {
  const classes = ['card', 'bg-white', 'rounded-2xl', 'overflow-hidden']

  const variantClasses = {
    default: 'shadow-card',
    bordered: 'border border-neutral-200',
    elevated: 'shadow-float',
    flat: 'shadow-none'
  }
  classes.push(variantClasses[props.variant])

  if (props.hoverable) {
    classes.push('transition-all duration-200 hover:shadow-float hover:-translate-y-1 cursor-pointer')
  }

  return classes.join(' ')
})
</script>

<style scoped>
.card-header {
  @apply px-6 py-4 border-b border-neutral-100;
}

.card-body {
  @apply p-6;
}

.card-footer {
  @apply px-6 py-4 border-t border-neutral-100 bg-neutral-50;
}
</style>