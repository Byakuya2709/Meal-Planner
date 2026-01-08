<template>
  <div :class="['feature-card', 'group', cardClasses]">
    <!-- Icon -->
    <div v-if="$slots.icon || icon" class="mb-4 md:mb-6">
      <slot name="icon">
        <IconBox :variant="iconVariant" :size="iconSize">
          {{ icon }}
        </IconBox>
      </slot>
    </div>

    <!-- Content -->
    <div>
      <h3 v-if="title" class="heading-4 mb-3">
        {{ title }}
      </h3>
      <p v-if="description" class="body-base text-neutral-600">
        {{ description }}
      </p>
      <slot />
    </div>

    <!-- Optional footer -->
    <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-neutral-100">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import IconBox from './IconBox.vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  iconVariant: {
    type: String,
    default: 'primary'
  },
  iconSize: {
    type: String,
    default: 'md'
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'bordered', 'elevated', 'glass'].includes(value)
  },
  hoverable: {
    type: Boolean,
    default: true
  }
})

const cardClasses = computed(() => {
  const classes = ['p-6 md:p-8 rounded-2xl']

  const variantMap = {
    default: 'bg-white shadow-soft',
    bordered: 'bg-white border-2 border-neutral-200',
    elevated: 'bg-white shadow-card',
    glass: 'bg-white/80 backdrop-blur-sm border border-neutral-200/50'
  }
  classes.push(variantMap[props.variant])

  if (props.hoverable) {
    classes.push('transition-all duration-300 hover:shadow-float hover:-translate-y-1')
  }

  return classes.join(' ')
})
</script>