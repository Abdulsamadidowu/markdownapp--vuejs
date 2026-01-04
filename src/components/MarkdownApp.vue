<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Editor from './Editor.vue'
import Preview from './Preview.vue'
import Toolbar from './Toolbar.vue'
import Header from './Header.vue'

const markdown = ref<string>('')

onMounted(() => {
  const saved = localStorage.getItem('savedMarkdown')
  if (saved) {
    markdown.value = saved
  }
})
</script>

<template>
  <div>
    <Header />
    <div class="flex gap-5 lg:flex-col p-5">
      <Toolbar v-model:markdown="markdown" />
      <main class="flex justify-between flex-col w-full lg:flex-row lg:h-[900px]">
        <Editor v-model:markdown="markdown" />
        <Preview :markdown="markdown" />
      </main>
    </div>
  </div>
</template>