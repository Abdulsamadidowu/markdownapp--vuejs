<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

interface Props {
  markdown: string
}

const props = defineProps<Props>()

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
})

const renderedMarkdown = computed(() => {
  return md.render(props.markdown)
})
</script>

<template>
  <section 
    aria-label="Markdown result" 
    class="w-full h-[45%] lg:w-[48%] lg:h-full"
  >
    <h2 class="text-3xl text-center italic">Markdown</h2>
    <div 
      class="flex-1 w-full h-full prose max-w-none p-3 overflow-auto border-2 border-black rounded-2xl"
      v-html="renderedMarkdown"
    />
  </section>
</template>