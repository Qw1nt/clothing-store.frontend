<script setup lang="ts">
import {getAuthentication, removeAccessToken} from "~/scripts/authentication-storage";
import {UserRequestGroup} from "~/scripts/requests-groups/user-request-group";
import Grid from "~/components/grid.vue";
import PageHeader from "~/components/page-header.vue";
import User from "~/scripts/data/user";

import {formatData} from "~/scripts/date-formatter";
import {OrderInHistory} from "~/scripts/data/order-in-history";
import {UserRole} from "~/scripts/data/user-role";
import {CartItem} from "~/scripts/data/cart-item";

interface Tab {
    title: string;
    key: string;
    onClick: () => any;
}

const userRequests = new UserRequestGroup(getAuthentication());

const activeTab = ref('profile');
const tabs = ref([] as Tab[]);
const user = ref<User>({} as User);
const orders = ref([] as OrderInHistory[]);

const fullOrderDialog = ref(false);
const fullOrderDialogModel = ref<CartItem[] | null>();

function logout() {
    removeAccessToken();
    useRouter().push('/');
}

function switchTab(key: string) {
    activeTab.value = key;
}

function openFullDialog(items: CartItem[]) {
    fullOrderDialogModel.value = items;
    fullOrderDialog.value = true;
}

function calculatePrice(items: CartItem[]): number {
    let sum = 0;
    items.forEach(element => sum += element.product.price);
    return sum;
}

onBeforeMount(async () => {
    await userRequests.getUserInfo(x => user.value = x);
    await userRequests.getOrderHistory(x => orders.value = x);

    if (user.value.role == UserRole.Admin) {
        tabs.value.push({
            title: "Админ-панель",
            key: "admin-panel",
            onClick: () => useRouter().push('/admin-panel')
        });
    }

    if (user.value.role == UserRole.Manager) {
        tabs.value.push({
            title: "Отчёты",
            key: 'sample',
            onClick: () => useRouter().push('/admin-panel/report')
        });
    }

    tabs.value.push({title: 'Профиль', key: 'profile', onClick: () => switchTab('profile')})
    tabs.value.push({title: 'История заказов', key: 'history', onClick: () => switchTab('history')})
    tabs.value.push({title: 'Выйти', key: 'logout', onClick: () => logout()})

})
</script>

<template>
    <div v-if="user != {}">
        <el-dialog v-model="fullOrderDialog">
            <template #title>
                <p class="font-bold text-lg">Заказ</p>
            </template>
            <template #default>
                <div class="grid grid-cols-6 p-1 bg-gray-100 mb-3">
                    <p class="font-medium">Номер</p>
                    <p class="font-medium col-span-3">Название</p>
                    <p class="font-medium">Кол-во</p>
                    <p class="font-medium">Цена за штуку</p>
                </div>
                <div class="grid grid-cols-6 p-1 mb-5" v-for="(item, index) in fullOrderDialogModel">
                    <p>{{index + 1}}</p>
                    <a class="col-span-3 hover:text-sky-500 cursor-pointer" :href="`/product-info/${item.product.id}`" target="_blank" title="Открыть страницу товара">{{item.product.name}}</a>
                    <p>{{item.count}}</p>
                    <p>{{item.product.price}}₽</p>
                </div>
            </template>
        </el-dialog>
        
        <page-header header="Личный кабинет"></page-header>
        <grid>
            <div class="flex justify-center mb-16 mt-5">
                <div class="grid grid-cols-4 gap-x-5 justify-items-center text-xl cursor-pointer">
                    <div v-for="tab in tabs"
                         @click="tab.onClick()"
                         :class="{
                        'text-blue-800' : activeTab == tab.key,
                        'border-b-2 border-blue-700' : activeTab == tab.key,
                        'text-gray-800' : activeTab != tab.key}">{{ tab.title }}
                    </div>
                </div>
            </div>

            <div v-if="activeTab == 'profile'" class="w-1/2">
                <div class="grid grid-cols-8 gap-y-5">
                    <p class="text-bold col-span-3 text-lg font-medium text-gray-700">Логин:</p>
                    <p class="text-lg col-span-3">{{ user.login }}</p>
                    <p class="col-span-2"></p>
                    <p class="text-bold col-span-3 text-lg font-medium text-gray-700">Дата регистрации:</p>
                    <p class="text-lg col-span-3">{{ formatData(user.registerDate) }}</p>
                    <p class="col-span-2"></p>

                    <div class="col-span-8 mt-10"/>
                </div>
            </div>
            <div v-if="activeTab == 'history'">
                <page-header v-if="orders.length == 0" header="Нет заказрв"></page-header>
                <div v-else class="grid grid-cols-5">
                    <div class="col-start-2 col-span-3">
                        <div class="grid grid-cols-5 bg-gray-100 p-3 mb-3">
                            <p class="font-medium">Дата</p>
                            <p class="font-medium text-center col-span-2">Кол-во товаров</p>
                            <p class="font-medium text-center">Сумма покупки</p>
                        </div>
                        <div v-for="order in orders"
                             class="mb-5 grid grid-cols-5 p-3 outline outline-1 outline-gray-100">
                            <p>{{ formatData(order.date) }}</p>
                            <p class="text-center col-span-2">{{ order.items.length }}</p>
                            <p class="text-center">{{ calculatePrice(order.items) }}₽</p>
                            <el-button @click="openFullDialog(order.items)" class="ml-5">Подробнее</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </grid>
    </div>
</template>

<style scoped>

</style>