<template>
  <div class="base-input">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-neutral-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>
    
    <div class="relative">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <div v-if="$slots.icon" class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
        <slot name="icon" />
      </div>
    </div>

    <p v-if="error" class="mt-2 text-sm text-error">
      {{ error }}
    </p>
    <p v-else-if="hint" class="mt-2 text-sm text-neutral-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)

const inputClasses = computed(() => {
  const classes = [
    'w-full px-4 py-3 rounded-xl border transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-1',
    'disabled:bg-neutral-100 disabled:cursor-not-allowed'
  ]

  if (props.$slots?.icon) {
    classes.push('pl-12')
  }

  if (props.error) {
    classes.push('border-error focus:ring-error')
  } else {
    classes.push('border-neutral-300 focus:border-primary-500 focus:ring-primary-500')
  }

  return classes.join(' ')
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleBlur = (event) => {
  emit('blur', event)
}

const handleFocus = (event) => {
  emit('focus', event)
}
</script>