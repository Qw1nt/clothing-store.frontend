<script setup lang="ts">
import {productsInCartCount} from "~/scripts/stores/local-user-cart";
import {accessToken, updateAuthorization} from "~/scripts/authentication-storage"
import {useUserStore} from "~/scripts/stores/user-store";

const router = useRouter();
const render = ref(false);
const userStore = useUserStore()

function routeTo(name: string) {
    router.push({name: name});
}

onBeforeMount(() => {
    updateAuthorization();
    render.value = true;
    userStore.syncWithLocalstorage();
})
</script>

<template>
    <div v-if="render">
        <div class="py-2 h-16 border-b-2">
            <div class="grid grid-flow-row-dense grid-cols-6 grid-rows-1 items-center content-center">
                <div/>
                <div class="flex w-full justify-end col-span-4 items-center">
                    <div @click="router.push('/')" class="flex items-center cursor-pointer text-blue-600 hover:text-blue-500">
                        <icon size="40" name="ph:dress-duotone"/>
                        <p class="text-2xl font-bold">Cloth</p>
                    </div>
<!--                    <p 
                       class="text-xl text-sky-500 hover:text-sky-300 hover:border-sky-300 font-medium border-2 border-sky-500 p-2 cursor-pointer">
                        C. F. W.</p>-->
                    <p @click="routeTo('new-products')"
                       class="text-base text-gray-700 hover:text-gray-500 ml-5 cursor-pointer">Новинки</p>
                    <p/>
                    <p @click="routeTo('catalog')"
                       class="text-base text-gray-700 hover:text-gray-500 ml-5 cursor-pointer mr-auto">Каталог</p>
                    <p/>

                    <div v-if="accessToken != null && accessToken.length > 0"
                         class="flex items-center">
                        <div @click="router.push('/profile')"
                             class="cursor-pointer text-gray-700 hover:text-gray-500 flex items-center">
                            <p class="text-lg font-medium">ЛК</p>
                            <icon size="32" name="ph:user-circle"/>
                        </div>
                        <el-badge :value="productsInCartCount" class="item">
                            <icon @click="router.push('/cart')" size="32" name="ic:outline-shopping-cart"
                                  class="ml-4 cursor-pointer text-gray-700 hover:text-gray-500"/>
                        </el-badge>
                    </div>
                    <p v-else @click="routeTo('login')"
                       class="text-lg text-gray-700 hover:text-gray-500 ml-3 p-2 cursor-pointer">
                        Войти
                    </p>
                </div>
            </div>
        </div>
        <NuxtPage/>
        <div class="h-fill mt-10 bg-gray-100 grid grid-flow-row-dense grid-cols-6">
            <!--            <div/>
                        <div class="flex flex-wrap col-span-4 row-start-2 row-end-6 col-start-2 row-span-4 mt-5 justify-between">
                            <div>
                                <p @click="routeTo('new-products')"
                                   class="text-gray-900 hover:text-gray-500 font-bold text-sm cursor-pointer">Новинки</p>
                                <p class="text-gray-900 hover:text-gray-500 font-bold text-base cursor-pointer mt-2">Одежда</p>
                            </div>
                        </div>-->
            <div class="col-start-2 col-span-4 py-5">
                <div class="grid gap-4 grid-cols-6 text-xs">
                    <div class="col-span-2">© Clothing for Women™ 2022-2023 - сеть магазинов женской одежды.</div>
                    <div class="text-center cursor-pointer text-gray-800 hover:text-gray-500 underline decoration-1">
                        Политика конфиденциальности.
                    </div>
                    <div class="cursor-pointer text-gray-800 hover:text-gray-500 underline decoration-1">Процесс
                        оплаты.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
body {
    margin: 0;
}
</style>