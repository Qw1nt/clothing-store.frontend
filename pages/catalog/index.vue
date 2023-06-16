<script setup lang="ts">
import Product from "~/scripts/data/product";
import Category from "~/scripts/data/category";
import CatalogRequestGroup from "~/scripts/requests-groups/catalog-request-group";
import {CategoryRequestGroup} from "~/scripts/requests-groups/category-request-group";
import HttpClient from "~/scripts/http/http-client";

const catalogRequest = new CatalogRequestGroup();
const categoryRequest = new CategoryRequestGroup();

const allProducts = ref([] as Product[]);
const catalogProducts = ref([] as Product[])
const searchModel = ref('');
const filteredCategories = ref([] as Category[])
const selectedCategory = ref({} as Category);

const querySearch = (queryString: string, cb: any) => {
    const results = queryString
        ? allProducts.value.filter(createFilter(queryString))
        : allProducts.value
    cb(results)
}
const createFilter = (queryString: string) => {
    return (product: Product) => {
        return (
            product.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
}

function selectProductInSearch(item: Product) {
    useRouter().push(`/product-info/${item.id}`)
}

async function filterCatalogProducts(category: Category) {
    selectedCategory.value = category;
    const endpoint = "catalog/category/" + category.id.toString()

    if (category.id != -1) {
        await catalogRequest.getByCategory(category.id, x => catalogProducts.value = x[0]);
    } else {
        catalogProducts.value = allProducts.value;
    }
}

onBeforeMount(async () => {
    await catalogRequest.getAll(x => allProducts.value = x);
    catalogProducts.value = allProducts.value;

    await categoryRequest.getAll(x => filteredCategories.value = x);
    filteredCategories.value.unshift({name: 'Все', id: -1});
    selectedCategory.value = filteredCategories.value[0];
});
</script>

<template>
    <page-header header="Каталог"></page-header>
    <div class="grid grid-cols-10" v-if="allProducts != null">
        <el-autocomplete
                v-model="searchModel"
                :fetch-suggestions="querySearch"
                clearable
                class="col-start-4 col-span-4"
                placeholder="Поиск товара"
                @select="selectProductInSearch">
            <template #default="{ item }">
                <div class="value">{{ item.name }}</div>
            </template>
        </el-autocomplete>
        <div class="flex">
            <div class="text-sm mt-1 ml-5">
                Категория:
            </div>
            <el-dropdown class="ml-1">
                <p class="mt-2 text-sky-500">
                    {{ selectedCategory.name }}
                </p>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-for="category in filteredCategories"
                                          @click="filterCatalogProducts(category)">{{ category.name }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <card-catalog :data="catalogProducts" v-if="catalogProducts.length > 0"></card-catalog>

</template>

<style scoped>

</style>