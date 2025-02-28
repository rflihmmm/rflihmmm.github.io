<script setup>
import { ref } from "vue"

const count = ref(1)

function double() {
  return (count.value *= 2)
}
</script>

<template>
  <div>
    <button @click="double()" class="text-xl">counter is : {{ count }}</button>
  </div>
</template>
