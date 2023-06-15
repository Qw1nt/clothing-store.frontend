<script setup lang="ts">
import {UserRole} from "~/scripts/data/user-role";
import {checkPermission} from "~/scripts/local-firewall"
import {UploadFile} from "element-plus";
import {getImage} from "~/scripts/http/http-configuration";
import HttpClient from "~/scripts/http/http-client";
import {getAuthentication} from "~/scripts/authentication-storage";
import Category from "~/scripts/data/category";

interface Option {
    value: number;
    label: string;
}

const render = ref(false)
const httpClient = new HttpClient("product", getAuthentication());

const categories = ref([] as Option[]);

const newProductImage = ref<File | null>(null!)
const newProductImageUrl = ref('')

const name = ref('');
const selectedCategories = ref([] as any[]);
const description = ref('');
const price = ref('');
const color = ref('');

function uploadProductImage(file: UploadFile) {
    newProductImage.value = file.raw!;
    newProductImageUrl.value = URL.createObjectURL(newProductImage.value);
}

async function addProduct() {
    const formData = new FormData();
    
    selectedCategories.value.forEach(element => {
        formData.append("categoriesIds", element);
    });
    
    formData.append("name", name.value);
    formData.append("description", description.value);
    formData.append("price", price.value);
    formData.append("color", color.value);
    formData.append("image", newProductImage.value!);
    await httpClient.post<FormData, null>("", formData, () => {
        useRouter().push("/admin-panel")
    });
}

onBeforeMount(async () => {
    await checkPermission(UserRole.Admin, () => {
    });
    const client = new HttpClient("category");
    await client.get<Category[]>("", x => {
        x.forEach(category => {
            categories.value.push({value: category.id, label: category.name});
        })
    })
    render.value = true
})
</script>

<template>
    <div v-if="render">
        <page-header header="Добавление товара"/>
        <grid class="p-5">
            <div class="flex justify-center">
                <div class="w-1/4">
                    <div class="w-full flex justify-center">
                        <div v-if="newProductImage != null && newProductImageUrl.length > 0">
                            <img :src="newProductImageUrl"/>
                        </div>
                    </div>
                    <el-upload class="flex flex-col jusitfy-center mt-5" action="#" :auto-upload="false"
                               :show-file-list="false"
                               :on-change="uploadProductImage">
                        <el-button class="w-full" type="primary">Изменить изображение</el-button>
                        <template #file="{file}">
                            <div>
                                {{ file }}
                                <img class="el-upload-list__item-thumbnail" :src="file" alt=""/>
                            </div>
                        </template>
                        <template #tip>
                            <div class="text-right text-xs">
                                jpg/png файлы
                            </div>
                        </template>
                    </el-upload>
                </div>
            </div>
            <div class="flex justify-center">
                <div class="w-3/4">
                    <el-input v-model="name" class="mt-5" placeholder="Название"/>
                    <el-select-v2 class="mt-3 w-full"
                                  v-model="selectedCategories"
                                  :options="categories"
                                  placeholder="Категории"
                                  multiple
                                  collapse-tags
                                  collapse-tags-tooltip
                    />
                    <el-input type="textarea" v-model="description" class="mt-3" placeholder="Описание"/>
                    <div class="flex mt-3">
                        <el-input v-model="color" class="mr-10" placeholder="Цвет"/>
                        <el-input v-model="price" placeholder="Цена"/>
                    </div>
                </div>
            </div>

            <div class="flex justify-end">
                <el-button @click="addProduct()" class="mr-40 mt-5">Добавить</el-button>
            </div>
        </grid>
    </div>
</template>

<style scoped>

</style>