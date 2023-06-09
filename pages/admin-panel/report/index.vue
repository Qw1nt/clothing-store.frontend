<script setup lang="ts">
import {checkPermission} from "~/scripts/local-firewall";
import {UserRole} from "~/scripts/data/user-role";
import 'dayjs/locale/ru'
import CatalogRequestGroup from "~/scripts/requests-groups/catalog-request-group";
import {getAuthentication} from "~/scripts/authentication-storage";
import {ReportRequestGroup} from "~/scripts/requests-groups/report-request-group";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import {ReportRecord} from "~/scripts/data/report-record";

dayjs.extend(utc)

const render = ref(false)

const pickDate = ref<Date[]>();
const tableData = ref<ReportRecord[] | null>();

const catalogRequests = new CatalogRequestGroup(getAuthentication());
const targetProducts = ref([] as number[]);

const options = ref([] as any[]);

async function buildsReport() {
    const reportRequests = new ReportRequestGroup(getAuthentication());
    const productIds = [] as number[]
    targetProducts.value.forEach(element => {
        productIds.push(element)
    })

    await reportRequests.build({
        productsIds: productIds,
        startDate: pickDate.value![0],
        endDate: pickDate.value![1]
    }, x => {
        tableData.value = x
    })
}

onBeforeMount(async () => {
    await checkPermission(UserRole.Manager, () => render.value = true);
    await catalogRequests.getAll(x => {
        x.forEach(element => {
            options.value.push({
                value: element.id,
                label: element.name
            })
        })
    });
})
</script>

<template>
    <div v-if="render">
        <page-header header="Формирование отчёта продаж"></page-header>
        <grid>
            <div class="flex justify-center">
                <el-select-v2
                        v-model="targetProducts"
                        :options="options"
                        opt
                        placeholder="Выберите товары"
                        class="w-2/5 mr-6"
                        multiple
                        collapse-tags
                        collapse-tags-tooltip
                />
                <el-date-picker
                    v-model="pickDate"
                    type="daterange"
                    class="mr-5"
                    start-placeholder="Начало"
                    end-placeholder="Конец"
                    :default-value="[new Date(2023, 5, 1), new Date(2023, 5, 31)]"
                />
<!--                <el-date-picker v-model="pickDate" class="mr-5" placeholder="Начало"></el-date-picker>
                <el-date-picker v-model="endDate" class="mr-5" placeholder="Конец"></el-date-picker>-->
                <el-button @click="buildsReport" type="primary">Сформировать</el-button>
            </div>
            <el-table v-if="tableData != null" border :data="tableData" class="mt-10">
                <el-table-column prop="product.name" label="Товар"/>
                <el-table-column prop="count" label="Кол-во"/>
            </el-table>
        </grid>
    </div>
</template>

<style scoped>

</style>