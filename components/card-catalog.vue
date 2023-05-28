<script setup lang="ts">
import Product from "~/scripts/data/product";
import {getImage} from "~/scripts/http/http-configuration";

interface Props {
    data: Product[],
    tag?: 'New' | 'Hit'
}

const props = defineProps<Props>();
const router = useRouter();
</script>

<template>
    <div class="grid grid-flow-row-dense grid-cols-6 grid-rows-1" v-if="props.data != null">
        <div/>
        <div class="flex flex-wrap col-span-4 mt-5 justify-between">
            <div v-for="product in props.data" :key="product" class="mb-5">
                <div class="flex-initial w-96">
                    <div v-if="props.tag != null"
                         class="flex absolute mt-2 ml-2 w-14 h-6 justify-center items-center text-sm bg-white/75">
                        {{ props.tag }}
                    </div>
                    <img :src="getImage(product.imageUrl)" alt=""/>
                </div>
                <div class="flex flex-col justify-center text-center select-none w-96 px-5 text-sm pt-1 ">
                    <div @click="router.push(`/product-info/${product.id}`)" class="truncate text-gray-800 hover:text-gray-400 cursor-pointer" :title="product.name">
                        {{ product.name }}
                    </div>
                    <div class="mt-1 text-base font-medium">
                        {{product.price}} ₽
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>