<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  markdown: string
}

defineProps<Props>()

const emit = defineEmits<{
  'update:markdown': [value: string]
}>()

const editorRef = ref<HTMLTextAreaElement | null>(null)

// Expose the textarea ref so parent can access it
defineExpose({
  editorRef
})
</script>

<template>
  <section class="w-full h-[48%] lg:w-[48%] lg:h-full mt-0">
    <h2 class="text-3xl text-center italic text-[#94a3b8]">Editor</h2>
    <textarea
      ref="editorRef"
      aria-label="Markdown input"
      placeholder="Type here...."
      class="w-full h-full p-3 border-2 border-black rounded-2xl"
      :value="markdown"
      @input="emit('update:markdown', ($event.target as HTMLTextAreaElement).value)"
    />
  </section>
</template>