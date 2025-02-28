<script setup>
import { RouterView } from "vue-router"
import Header from "@/components/Header.vue"
</script>

<template>
  <div
    class="font-jbmono mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:py-0"
  >
    <Header />
    <RouterView />
  </div>

</template>
