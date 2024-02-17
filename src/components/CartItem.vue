<template>
    <li>
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
            <div class="flex-shrink-0">
                <img class="w-12 h-12 rounded-full" :src="asset(item.imageUrl)" :alt="item.name">
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {{ item.name }}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    ${{ item.price }}
                </p>
            </div>
            <button @click="$emit('removeItem', item.code)"
                class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <svg class="w-6 h-6 text-red-700 hover:text-red-800 dark:text-white cursor-pointer" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </li>
</template>

<script>
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default {
    props: ['item'],
    data() {
        return {
            asset(path) {
                if (String(path).startsWith('/')) {
                    path = path.substring(1);
                }

                return `${BACKEND_URL}/${path}`
            }
        }
    },
}
</script>