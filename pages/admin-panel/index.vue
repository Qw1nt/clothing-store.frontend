<script setup lang="ts">
import {UserRequestGroup} from "~/scripts/requests-groups/user-request-group";
import {getAuthentication} from "~/scripts/authentication-storage";
import {UserRole} from "~/scripts/data/user-role";
import Product from "~/scripts/data/product";
import {ProductRequestGroup} from "~/scripts/requests-groups/product-request-group";
import CatalogRequestGroup from "~/scripts/requests-groups/catalog-request-group";
import {checkPermission} from "~/scripts/local-firewall";

const render = ref(false)
const products = ref([] as Product[])
const productRequests = new ProductRequestGroup(getAuthentication());
const catalogRequestGroup = new CatalogRequestGroup(getAuthentication());

onBeforeMount(async () => {
    await checkPermission(UserRole.Admin, async () => {
        render.value = true;
    })

    await catalogRequestGroup.getSorted(x => products.value = x);
})
</script>

<template>
    <div v-if="render">
        <page-header header="Админ-панель "></page-header>
        <grid>
            <div class="flex justify-end">
                <el-button @click="useRouter().push('/admin-panel/add-new-product')"
                           type="primary" size="large">
                    <icon class="mr-2" size="20" name="ep:circle-plus"/>
                    Добавить товар
                </el-button>
            </div>

            <div class="mt-10 h-8 mb-5 grid grid-cols-12 items-center bg-gray-100 gap-x-5">
                <p class="text-center text-base font-medium">ID</p>
                <p class="text-left col-span-4 font-medium text-base">Название</p>
                <p class="text-center col-span-2 font-medium text-base">Описание</p>
                <div class="grid grid-cols-2">
                    <p class="text-left col-span-2 font-medium text-base ml-3">Цена</p>
                </div>
                <p class="text-center font-medium text-base">Изображение</p>
                <div/>
                <div/>
            </div>
            <div v-for="product in products"
                 class="h-16 outline outline-1 outline-gray-200/50 outline-offset-2 mb-5 grid grid-cols-12 gap-x-5 items-center">
                <p class="text-center">{{ product.id }}</p>
                <p class="truncate col-span-4" :title="product.name">{{ product.name }}</p>
                <p class="truncate col-span-2 text-center"
                   v-if="product.description != null && product.description.length > 0" :title="product.description">
                    {{ product.description }}</p>
                <p class="truncate col-span-2 text-center" v-else>
                    <icon name="ic:sharp-circle" class="text-red-500" size="20"/>
                </p>
                <div class="grid grid-cols-2 ">
                    <p class="text-right mr-1">{{ product.price }}</p>
                    <p>₽</p>
                </div>
                <div class="text-center">
                    <icon name="ic:sharp-circle"
                          :class="{'text-red-500' : product.imageUrl == null, 'text-green-500': product.imageUrl != null}"
                          size="20"/>
                </div>
                <div/>
                <el-button @click="useRouter().push(`/admin-panel/edit-product/${product.id}`)" class="col-span-2">Редактировать</el-button>
            </div>
        </grid>
    </div>
</template>

<style scoped>

</style>