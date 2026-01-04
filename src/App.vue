<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const error = ref<Error | null>(null)

onErrorCaptured((err) => {
  error.value = err as Error
  console.error('Error caught by boundary:', err)
  return false // Prevent error from propagating
})

const resetError = () => {
  error.value = null
  router.push('/')
}
</script>

<template>
  <!-- Error Boundary UI -->
  <div 
    v-if="error" 
    class="min-h-screen flex items-center justify-center bg-red-50"
  >
    <div class="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 border-2 border-red-500">
      <h1 class="text-4xl font-bold text-red-600 mb-4">
        Oops! Something went wrong
      </h1>
      <p class="text-gray-700 mb-4">
        Application encountered an error!
      </p>
      <div class="bg-red-100 p-4 rounded-lg mb-4">
        <p class="text-sm text-red-800 font-mono">
          {{ error.toString() }}
        </p>
      </div>
      <button
        @click="resetError"
        class="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-semibold"
      >
        Go Back Home?
      </button>
    </div>
  </div>

  <!-- Normal App -->
  <RouterView v-else />
</template>