import type { Ref } from 'vue'

export interface MarkdownappProps {
  markdown: string
  editorRef: Ref<HTMLTextAreaElement | null>
}

export interface Toastprops {
  isOpen: boolean
  message: string
  type: 'success' | 'error'
}