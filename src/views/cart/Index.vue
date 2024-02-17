<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-200 mb-12">Shopping Cart</h1>
    <ul class="max-w-full divide-y divide-gray-200 dark:divide-gray-700 mb-8" v-if="cartItems.length > 0">
      <CartItem v-for="(item, index) in cartItems" :key="index"
        :class="{ 'pb-3 sm:pb-4': isFirst(index), 'py-3 sm:py-4': !isFirst(index) && !isLast(index), 'pt-3 pb-0 sm:pt-4': isLast(index) }"
        :item="item" @remove-item="removeFromCart" />
    </ul>

    <div class="max-w-full" v-else>
      Cart is empty
    </div>

    <div class="text-right text-lg mb-6">
      <span class="font-semibold">Total</span>:
      <span class="text-green-600 font-bold">${{ totalPrice }}</span>
    </div>

    <div class="flex justify-end">
      <button type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        :class="{ 'disabled:opacity-75': isEmpty }" :disabled="isEmpty">Checkout</button>
    </div>
  </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import axios from 'axios';

export default {
  data() {
    return {
      cartItems: [],
      isFirst(index) {
        return index === 0;
      },
      isLast(index) {
        return index === this.cartItems.length - 1;
      },
    };
  },
  methods: {
    async removeFromCart(productCode) {
      await axios.delete(`/api/orders/delete/user/1/product/${productCode}`);

      let deletedItemIndex = this.cartItems.map(function (item) {
        return item.code;
      }).indexOf(productCode);

      this.cartItems.splice(deletedItemIndex, 1);
    }
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + Number(item.price), 0);
    },
    isEmpty() {
      return this.cartItems.length === 0;
    }
  },
  async created() {
    const result = await axios.get('/api/orders/user/1');
    this.cartItems = result.data[0].products;
  },
  components: { CartItem }
}
</script>

<style></style>