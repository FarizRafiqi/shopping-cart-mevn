<template>
    <div v-if="product">
        <h2 class="text-4xl font-bold dark:text-white mb-8">Detail Product {{ product.name }}</h2>

        <div v-if="isShowNotif"
            class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
            role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
                Item added successfully.
            </div>
        </div>

        <div class="flex gap-8">
            <div class="w-2/5">
                <img :src="asset(product.imageUrl)" class="max-w-full h-auto" alt="">
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
                    <span class="text-gray-600 font-bold mr-2">Price:</span>
                    <span class="text-green-600 font-bold">${{ product.price }}</span>
                </div>
                <button
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="addToCart(product.code)">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>

    <NotFound v-else />
</template>

<script>
import axios from 'axios';
import NotFound from '../errors/404.vue';
import { useProductStore } from '@/stores/product';
import _ from 'lodash';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default {
    components: {
        NotFound
    },
    data() {
        return {
            product: {},
            isShowNotif: false,
        }
    },
    methods: {
        asset(path) {
            if (String(path).startsWith('/')) {
                path = path.substring(1);
            }

            return `${BACKEND_URL}/${path}`
        },
        async addToCart(productCode) {
            // TODO: masih hardcode user idnya
            await axios.post(`/api/orders/user/1/add`, { product: productCode });
            this.isShowNotif = true;

            setTimeout(() => {
                this.isShowNotif = false;
            }, 3000);
        }
    },
    async created() {
        const id = this.$route.params.id;
        const result = await axios.get(`/api/products/${id}`);
        this.product = result.data;

        const productStore = useProductStore();
        productStore.setIsFound(this.product !== undefined);
    },
}
</script>

<style></style>