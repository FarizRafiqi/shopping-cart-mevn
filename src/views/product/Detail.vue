<template>
    <h2 class="text-4xl font-bold dark:text-white mb-8">Detail Product {{ product.name }}</h2>

    <div class="flex gap-8">
        <div class="w-2/5">
            <img :src="product.imageUrl" class="max-w-full h-auto" alt="">
        </div>
        <div class="w-3/5">
            <h2 class="text-2xl font-bold mb-2">{{ product.name }}</h2>
            <div class="flex items-center mb-4">
                <span class="text-gray-600 mr-2">Rating:</span>
                <span class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 22 20">
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    {{ product.averageRating }}
                </span>
            </div>
            <p class="text-gray-700 mb-4">{{ product.description }}</p>
            <div class="flex items-center mb-4">
                <span class="text-gray-600 mr-2">Harga:</span>
                <span class="text-green-600 font-bold">${{ product.price }}</span>
            </div>
            <button
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                to Cart</button>
        </div>
    </div>
</template>

<script>
import { products } from '@/data-seed';
export default {
    data() {
        return {
            products,
        }
    },
    computed: {
        product() {
            return this.products.find((p) => p.id === this.$route.params.id)
        }
    }
}
</script>

<style></style>