<script setup lang="ts">
import {getAuthentication, removeAccessToken} from "~/scripts/authentication-storage";
import {UserRequestGroup} from "~/scripts/requests-groups/user-request-group";
import Grid from "~/components/grid.vue";
import PageHeader from "~/components/page-header.vue";
import User from "~/scripts/data/user";

import {formatData} from "~/scripts/date-formatter"
import {OrderInHistory} from "~/scripts/data/order-in-history";
import {UserRole} from "~/scripts/data/user-role";

interface Tab {
    title: string;
    key: string;
    onClick: () => any;
}

const userRequests = new UserRequestGroup(getAuthentication());

const activeTab = ref('profile');
const tabs = ref([] as Tab[])
const user = ref<User>({} as User);
const orders = ref([] as OrderInHistory[])

function logout() {
    removeAccessToken();
    useRouter().push('/');
}

function switchTab(key: string){
    activeTab.value = key;
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

    //TODO add manager role
    if (user.value.role == UserRole.Manager) {
        tabs.value.push({
            title: "Отчёты",
            key: 'sample',
            onClick: () => useRouter().push('/admin-panel')
        });
    }
    
    tabs.value.push({title: 'Профиль', key: 'profile', onClick: () => switchTab('profile')})
    tabs.value.push({title: 'История заказов', key: 'history', onClick: () => switchTab('history')})
    tabs.value.push({title: 'Выйти', key: 'logout', onClick: () => logout()})

})
</script>

<template>
    <div v-if="user != {}">
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

                    <!--
                                        <p class="text-bold col-span-3 text-lg font-medium text-gray-700">Фамилия, Имя:</p>
                                        <p class="text-lg col-span-3">{{user.firstSecondNames}}</p>
                                        <p class="col-span-2"></p>    
                    -->

                    <p class="text-bold col-span-3 text-lg font-medium text-gray-700">Дата регистрации:</p>
                    <p class="text-lg col-span-3">{{ formatData(user.registerDate) }}</p>
                    <p class="col-span-2"></p>

                    <div class="col-span-8 mt-10"/>
                </div>
            </div>
            <div v-if="activeTab == 'history'">
                <page-header v-if="orders.length == 0" header="Нет заказрв"></page-header>
                <div v-else>
                    <div v-for="order in orders">
                        {{ order.items.length }}
                    </div>
                </div>
            </div>
        </grid>
    </div>
</template>

<style scoped>

</style>