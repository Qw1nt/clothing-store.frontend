<script setup lang="ts">
import {checkPermission} from "~/scripts/local-firewall";
import {UserRole} from "~/scripts/data/user-role";
import Product from "~/scripts/data/product";
import {ProductRequestGroup} from "~/scripts/requests-groups/product-request-group";
import {getAuthentication} from "~/scripts/authentication-storage";
import {getImage} from "~/scripts/http/http-configuration";
import {UploadFile} from "element-plus";
import {EditProductRequest} from "~/scripts/request-models/edit-product-request";
import HttpClient from "~/scripts/http/http-client";

const productRequests = new ProductRequestGroup(getAuthentication());
const product = ref<Product | null>()
const newProductImage = ref<File | null>(null!)
const newProductImageUrl = ref('')

const productDescriptionDialog = ref(false);

function uploadProductImage(file: UploadFile) {
    newProductImage.value = file.raw!;
    newProductImageUrl.value = URL.createObjectURL(newProductImage.value);
}

function resetUploadedImage() {
    newProductImage.value = null!;
    newProductImageUrl.value = null!;
}

async function resetChanges() {
    await useRouter().push("/admin-panel");
}

async function deleteProduct(){
    const client = new HttpClient("product", getAuthentication());
    await client.delete(`${product.value?.id}`, async () => {
        await useRouter().push("/admin-panel");
    });
}

async function saveChanges() {
    const unrefProduct = product.value;
    const request: EditProductRequest = {
        name: unrefProduct!.name,
        price: unrefProduct?.price,
        description: unrefProduct?.description,
        color: unrefProduct?.color,
        categories: unrefProduct?.categories,
    }

    await productRequests.update(product.value!.id, request);

    if (newProductImage.value != null) {
        await productRequests.updateImage(product.value!.id, newProductImage.value!);
    }

    newProductImage.value = null;
    newProductImageUrl.value = null!;
}

onBeforeMount(async () => {
    await checkPermission(UserRole.Admin, async () => {
        await productRequests.getProduct(useRoute().params.id as any, x => product.value = x);
    });
})
</script>

<template>
    <div v-if="product != null">
        <el-dialog v-model="productDescriptionDialog" title="Описание товара">
            <el-input v-model="product.description" type="textarea"/>
        </el-dialog>

        <page-header header="Редактирование товара"></page-header>
        <div class="grid grid-cols-5 gap-x-5">
            <div/>
            <div>
                <img v-if="newProductImageUrl == null || newProductImageUrl.length == 0"
                     :src="getImage(product.imageUrl)"/>
                <div v-else>
                    <img :src="newProductImageUrl"/>
                    <el-button @click="resetUploadedImage">Сбросить</el-button>
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
<!--                        <div class="text-right text-xs">
                            jpg/png файлы
                        </div>-->
                    </template>
                </el-upload>
            </div>
            <div class="col-span-2 flex flex-col justify-end">
                <input class="hover:outline outline-1 outline-sky-500 w-full text-xl" v-model="product.name"/>
                <div class="flex mt-1">
                    <p class="text-lg font-medium mr-2">Цвет: </p>
                    <input class="hover:outline outline-1 outline-sky-500 w-full text-lg" v-model="product.color"/>
                </div>
                <div class="flex mt-1">
                    <p class="text-lg font-medium mr-2">Цена(₽): </p>
                    <input class="hover:outline outline-1 outline-sky-500 w-full text-lg" v-model="product.price"/>
                </div>
                <div class="mt-5">
                    <p class="text-lg font-medium">Описание: </p>
                    <p v-if="product.description != null && product.description.length > 0"
                       class="w-full text-lg">{{ product.description }}</p>
                    <el-button @click="productDescriptionDialog = true" class="mt-1 w-full" size="small">
                        {{ product.description?.length > 0 ? 'Редактировать' : 'Добавить' }}
                    </el-button>
                </div>
                <div class="mt-auto"></div>

                <div class="flex justify-end">
                    <el-button @click="deleteProduct()" type="danger" class=" mr-auto">Удалить</el-button>
                    <el-button @click="resetChanges()" >Отмена</el-button>
                    <el-button @click="saveChanges()" type="primary">Сохранить изменения</el-button>
                    
                    <div class="grid grid-cols-4">
                        <div></div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>