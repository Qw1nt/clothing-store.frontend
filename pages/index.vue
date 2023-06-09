<script setup lang="ts">
import Product from "~/scripts/data/product";
import CatalogRequestGroup from "~/scripts/requests-groups/catalog-request-group";
import {onBeforeMount} from "@vue/runtime-core";

const catalogRequests = new CatalogRequestGroup();

const carouselImages = [
    "home-carousel/1.png",
    "home-carousel/2.png",
    "home-carousel/3.png",
    "home-carousel/4.png",
];

const topNews = ref([] as Product[]);
const bestsellers = ref([] as Product[]);

onBeforeMount(async () => {
    await catalogRequests.getNew(3, x => topNews.value = x);
    await catalogRequests.getBestsellers(x => bestsellers.value = x);
})
</script>

<template>
<!--    <el-carousel height="550px">
        <el-carousel-item v-for="item in carouselImages">
            <el-image :src="item"/>
        </el-carousel-item>
    </el-carousel>-->
    <p class="flex w-full justify-center mt-20 font-bold text-gray-800 text-3xl">Новинки</p>
    <card-catalog tag="New" :data="topNews"></card-catalog>
    <p class="flex w-full justify-center mt-20 font-bold text-gray-800 text-3xl">Хиты Продаж</p>
    <card-catalog tag="Hit" :data="bestsellers"></card-catalog>
</template>

<style scoped>

</style>