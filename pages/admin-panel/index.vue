<script setup lang="ts">
import {UserRequestGroup} from "~/scripts/requests-groups/user-request-group";
import {getAuthentication} from "~/scripts/authentication-storage";
import {UserRole} from "~/scripts/data/user-role";
import Product from "~/scripts/data/product";
import {ProductRequestGroup} from "~/scripts/requests-groups/product-request-group";
import {CartRequestGroup} from "~/scripts/requests-groups/cart-request-group";
import CatalogRequestGroup from "~/scripts/requests-groups/catalog-request-group";

const render = ref(false)
const products = ref([] as Product[])
const productRequests = new ProductRequestGroup(getAuthentication());
const catalogRequestGroup = new CatalogRequestGroup();

onBeforeMount(async () => {
    const userRequests = new UserRequestGroup(getAuthentication());
    const response = await userRequests.getUserInfo(x => {
        if (x.role != UserRole.Admin) {
            return navigateTo('/login');
        }
    })

    await catalogRequestGroup.getAll(x => products.value = x);
    render.value = true;
})
</script>

<template>
    <div v-if="render">
        <page-header header="Админ-панель "></page-header>
        <grid>
            <div class="flex justify-end">
                <el-button type="primary" size="large">
                    <icon class="mr-2" size="20" name="ep:circle-plus"/>
                    Добавить товар
                </el-button>
            </div>
            <div class="mt-5">
                
            </div>
            <div v-for="product in products"
                 class="h-16 outline outline-1 outline-gray-200/50 outline-offset-2 mb-5 grid grid-cols-12 items-center">
                <p class="text-center">{{ product.id }}</p>
                <p class="col-span-6">{{ product.name }}</p>
                <div class="grid grid-cols-2">
                    <p class="text-right mr-1">{{product.price}}</p>
                    <p>₽</p>
                </div>
                <div/>
                <div/>
                <el-button type="warning" class="col-span-2">Редактировать</el-button>
            </div>
        </grid>
    </div>
</template>

<style scoped>

</style>