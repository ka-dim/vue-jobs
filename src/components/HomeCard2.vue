<script setup>
  defineProps({
    bg: {
      type: Object,
      default: {
        content : 'bg-gray-100',
        button: 'bg-black hover:bg-gray-700'  
      }
    }
  })
</script>

<template>
  <div :class="`${bg.content} p-6 rounded-lg shadow-md`">
    <slot name="contentText" ></slot>
    <a :class="`${bg.button} inline-block  text-white rounded-lg px-4 py-2 `">
      <slot name="contentButton" ></slot>
    </a>
  </div>
</template>