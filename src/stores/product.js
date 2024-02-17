import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
    state: () => ({
        isProductFound: false,
    }),
    getters: {
        isFound: (state) => state.isProductFound,
    },
    actions: {
        setIsFound(val) {
            this.isProductFound = val
        }
    }
})