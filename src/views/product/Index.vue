<template>
    <h1 class="text-3xl font-bold dark:text-white mb-8">Products</h1>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ProductItem v-for="product in products" :key="product.id" :product="product" />
    </div>
</template>

<script>
import axios from 'axios';
import ProductItem from '@/components/ProductItem.vue';
export default {
    components: { ProductItem },
    data() {
        return {
            products: [],
        }
    },
    async created() {
        const result = await axios.get(`/api/products`);
        this.products = result.data;
    }
}
</script>

<style></style>