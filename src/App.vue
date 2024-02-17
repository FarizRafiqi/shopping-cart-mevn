<script setup>
import Navbar from './components/Navbar.vue'
import { RouterLink, RouterView } from 'vue-router'
import { computed, onBeforeMount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';

const route = useRoute();
const currentRouteName = computed(() => route.name);

const productStore = useProductStore();
const { isFound } = storeToRefs(productStore);
</script>

<template>
  <header>
    <Navbar />
  </header>

  <div class="px-32 pt-8 pb-32" :class="{
    'h-screen bg-slate-200': currentRouteName === 'product.detail' && !isFound
  }">
    <RouterView />
  </div>
</template>

<style scoped></style>
