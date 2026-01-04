<script setup lang="ts">
import type { Toastprops } from '../types-and-interfaces'

const props = defineProps<Toastprops>()

const bgColor = props.type === 'success' ? 'bg-green-600' : 'bg-red-600'
</script>

<template>
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div :class="`px-6 py-3 rounded-lg shadow-lg text-white ${bgColor}`">
        <p class="text-base font-medium">{{ message }}</p>
      </div>
    </div>
  </Teleport>
</template>