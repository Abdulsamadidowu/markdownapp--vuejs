<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 border-2 border-gray-800 text-center">
      <h1 class="text-9xl font-bold text-gray-800 mb-4">404</h1>
      <h2 class="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
      <p class="text-gray-600 mb-8">
        Haha you typed wrong, this page doesn't exist or has been moved.
      </p>
      <p class="text-gray-600 mb-8">
        Got an issue? Contact my creator.
      </p>
      <RouterLink
        to="/"
        class="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Go Back Home?
      </RouterLink>
    </div>
  </div>
</template>