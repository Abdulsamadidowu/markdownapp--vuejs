<script setup lang="ts">
import { ref } from 'vue'
import { 
  Copy, Scissors, Clipboard, Save, 
  Delete, Trash, Upload, Download 
} from 'lucide-vue-next'
import Toast from './Toast.vue'
import type { Toastprops } from '../types-and-interfaces'

interface Props {
  markdown: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:markdown': [value: string]
}>()

const toast = ref<Toastprops>({
  isOpen: false,
  message: '',
  type: 'success'
})

const fileInputRef = ref<HTMLInputElement | null>(null)

const focusStyled = 'focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-700 focus:rounded-lg focus:ring-opacity-75'

const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toast.value = { isOpen: true, message, type }
  setTimeout(() => {
    toast.value = { isOpen: false, message: '', type: 'success' }
  }, 2000)
}

const funcCopy = async () => {
  if (!props.markdown.trim()) {
    showToast('Nothing to copy?', 'error')
    return
  }
  try {
    await navigator.clipboard.writeText(props.markdown)
    showToast('Copied to clipboard!', 'success')
  } catch (error) {
    showToast('Failed to copy', 'error')
    console.error('Copy failed:', error)
  }
}

const funcCut = async () => {
  if (!props.markdown.trim()) {
    showToast('Nothing to cut?', 'error')
    return
  }
  try {
    await navigator.clipboard.writeText(props.markdown)
    emit('update:markdown', '')
    showToast('Cut to clipboard!', 'success')
  } catch (error) {
    showToast('Failed to cut', 'error')
    console.error('Cut failed:', error)
  }
}

const funcPaste = async () => {
  try {
    const text = await navigator.clipboard.readText()
    if (!text) {
      showToast('Clipboard is empty?', 'error')
      return
    }
    emit('update:markdown', props.markdown + text)
    showToast('Pasted!', 'success')
  } catch (error) {
    showToast('Cannot access clipboard.', 'error')
    console.error('Paste failed:', error)
  }
}

const funcSave = () => {
  if (!props.markdown.trim()) {
    showToast('Empty content?', 'error')
    return
  }
  try {
    localStorage.setItem('savedMarkdown', props.markdown)
    showToast('Saved!', 'success')
  } catch (error) {
    showToast('Failed to save', 'error')
    console.error('Save failed:', error)
  }
}

const funcClear = () => {
  if (!props.markdown.trim()) {
    showToast('Empty content?', 'error')
    return
  }

  if (confirm('Clear all content?')) {
    emit('update:markdown', '')
    showToast('Content cleared!', 'success')
  }
}

const funcDelete = () => {
  const saved = localStorage.getItem('savedMarkdown')
  if (!saved && !props.markdown.trim()) {
    showToast('Nothing to delete', 'error')
    return
  }

  if (confirm('Delete saved markdown?')) {
    try {
      localStorage.removeItem('savedMarkdown')
      emit('update:markdown', '')
      showToast('Deleted successfully!', 'success')
    } catch (error) {
      showToast('Failed to delete', 'error')
      console.error('Delete failed:', error)
    }
  }
}

const funcLoad = () => {
  fileInputRef.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  if (!file.type.match('text.*') && !file.name.endsWith('.md')) {
    showToast('Please select a text or markdown file', 'error')
    return
  }

  const reader = new FileReader()

  reader.onload = (e) => {
    const content = e.target?.result as string
    emit('update:markdown', content)
    showToast('File loaded successfully!', 'success')
  }

  reader.onerror = () => {
    showToast('Failed to read file', 'error')
    console.error('File read error:', reader.error)
  }

  reader.readAsText(file)
  target.value = ''
}

const funcDownload = () => {
  if (!props.markdown.trim()) {
    showToast('Empty content?', 'error')
    return
  }
  try {
    const blob = new Blob([props.markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, '-')
      .slice(0, -5)
    link.download = `markdown-${timestamp}.md`

    link.href = url
    link.click()

    URL.revokeObjectURL(url)

    showToast('File downloaded!', 'success')
  } catch (error) {
    showToast('Failed to download', 'error')
    console.error('Download failed:', error)
  }
}
</script>

<template>
  <div>
    <nav
      aria-label="Editor Buttons and actions"
      class="flex flex-col lg:flex-row justify-around items-center h-dvh w-16 lg:w-full lg:h-16 border-2 border-black rounded-2xl"
    >
      <h1 class="hidden lg:block text-3xl italic">
        PREVIEW MARKDOWN LIVE !
      </h1>
      <input
        ref="fileInputRef"
        type="file"
        accept=".txt,.md,.markdown,text/*"
        @change="handleFileChange"
        class="hidden"
        aria-hidden="true"
      />
      <button
        aria-label="Loads files from device"
        @click="funcLoad"
        :class="`flex flex-col items-center justify-center hover:scale-75 ${focusStyled}`"
      >
        <Upload :size="24" />
        Load
      </button>
      <button
        aria-label="Saves current progress"
        @click="funcSave"
        :class="`flex flex-col items-center justify-center hover:scale-75 ${focusStyled}`"
      >
        <Save :size="24" />
        Save
      </button>
      <button
        aria-label="Download file to device"
        @click="funcDownload"
        :class="`flex flex-col items-center justify-center text-xs lg:text-[16px] hover:scale-75 ${focusStyled}`"
      >
        <Download :size="24" />
        Download
      </button>
      <button
        aria-label="Copies content to clipboard"
        @click="funcCopy"
        :class="`flex flex-col items-center justify-center hover:scale-75 ${focusStyled}`"
      >
        <Copy :size="24" />
        Copy
      </button>
      <button
        aria-label="Cuts content to clipboard"
        @click="funcCut"
        :class="`flex flex-col items-center justify-center hover:scale-75 ${focusStyled}`"
      >
        <Scissors :size="24" />
        Cut
      </button>
      <button
        aria-label="Pastes content from clipboard"
        @click="funcPaste"
        :class="`flex flex-col items-center justify-center hover:scale-75 ${focusStyled}`"
      >
        <Clipboard :size="24" />
        Paste
      </button>
      <button
        aria-label="Clears current content"
        @click="funcClear"
        :class="`flex flex-col items-center justify-center hover:scale-75 ${focusStyled}`"
      >
        <Delete :size="24" />
        Clear
      </button>
      <button
        aria-label="Deletes current or saved progress"
        @click="funcDelete"
        :class="`flex flex-col items-center justify-center hover:scale-75 ${focusStyled}`"
      >
        <Trash :size="24" />
        Delete
      </button>
    </nav>
    <Toast 
      :is-open="toast.isOpen" 
      :message="toast.message" 
      :type="toast.type" 
    />
  </div>
</template>