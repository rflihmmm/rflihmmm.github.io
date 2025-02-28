<script setup>
import personalData from "@/assets/data/personal.json"
</script>

<template>
  <header
    class="lg:sticky lg:top-0 lg:max-h-screen lg:w-[48%] lg:flex lg:flex-col lg:justify-between lg:py-24"
  >
    <div>
      <h1 class="text-5xl">{{ personalData.name }}</h1>
      <h3 class="text-xl">{{ personalData.jobs }}</h3>
      <p></p>
      <button></button>
    </div>
  </header>
</template>
