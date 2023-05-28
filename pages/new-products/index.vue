<script setup lang="ts">
import Product from "~/scripts/data/product";
import CatalogRequestGroup from "~/scripts/requests-groups/catalog-request-group";
const products = ref([] as Product[]);
const requests = new CatalogRequestGroup();

onBeforeMount(async () => {
    await requests.getNew(18, x => products.value = x);
});
</script>

<template>
    <page-header header="Новинки"></page-header>
    <card-catalog tag="New" :data="products"></card-catalog>
</template>

<style scoped>

</style>