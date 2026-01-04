<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const shouldThrow = ref(false)

if (shouldThrow.value) {
  throw new Error('This test error is triggered by the Error Test page!')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
    <div class="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 border-2 border-yellow-500">
      <h1 class="text-3xl font-bold text-yellow-700 mb-4">Error Boundary Test</h1>
      <p class="text-gray-700 mb-6">
        Click the button below to trigger an error and test the Error Boundary.
      </p>
      <button
        @click="shouldThrow = true"
        class="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-semibold mb-4"
      >
        Trigger Error
      </button>
      <RouterLink
        to="/"
        class="block text-center text-blue-600 hover:underline"
      >
        Back to Home?
      </RouterLink>
    </div>
  </div>
</template>