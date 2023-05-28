<script setup lang="ts">
import {getAuthentication, removeAccessToken} from "~/scripts/authentication-storage";
import {UserRequestGroup} from "~/scripts/requests-groups/user-request-group";
import Grid from "~/components/grid.vue";
import PageHeader from "~/components/page-header.vue";
import User from "~/scripts/data/user";

import dayjs from 'dayjs'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'
import utcPlugin from 'dayjs/plugin/utc'
import localizeFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(CustomParseFormat);
dayjs.extend(utcPlugin);
dayjs.extend(localizeFormat);
dayjs.extend(timezone);

const userRequests = new UserRequestGroup(getAuthentication());

const activeTab = ref(0);
const tabs = [
    {title: 'Профиль', hover: 'hover:text-gray-500'},
    {title: 'История заказов', hover: 'hover:text-gray-500'},
    {title: 'Выйти', hover: 'hover:text-red-500'}
]
const user = ref<User>({} as User);

const formatDate = (date: Date) => {
    return dayjs(date).utc(false).tz('Asia/Yekaterinburg').format('DD.MM.YYYY')
}

function switchTab(index: number) {
    if (index == tabs.length - 1) {
        logout();
    } else {
        activeTab.value = index;
    }
}

function logout() {
    removeAccessToken();
    useRouter().push('/');
}

onBeforeMount(async () => {
    await userRequests.getUserInfo(x => user.value = x);
})
</script>

<template>
    <div v-if="user != {}">
        <page-header header="Личный кабинет"></page-header>
        <grid>
            <div class="flex justify-center mb-10 mt-5">
                <div class="grid grid-cols-3 gap-x-5 justify-items-center text-xl cursor-pointer">
                    <div v-for="(tab, index) in tabs"
                         @click="switchTab(index)"
                         :class="{
                        'text-blue-800' : activeTab == index,
                        'border-b-2 border-blue-700' : activeTab == index,
                        'text-gray-800' : activeTab != index}">{{ tab.title }}
                    </div>
                </div>
            </div>

            <div v-if="activeTab == 0" class="w-1/2">
                <div class="grid grid-cols-8 gap-y-5">
                    <p class="text-bold col-span-3 text-lg font-medium text-gray-700">Фамилия, Имя:</p>
                    <p class="text-lg col-span-3">{{user.login}}</p>
                    <p class="col-span-2"></p>    
                    
                    <p class="text-bold col-span-3 text-lg font-medium text-gray-700">Дата регистрации:</p>
                    <p class="text-lg col-span-3">{{formatDate(user.registerDate)}}</p>
                    <p class="col-span-2"></p>
                </div>
            </div>
            <div v-if="activeTab == 1">
            </div>
        </grid>
    </div>
</template>

<style scoped>

</style>