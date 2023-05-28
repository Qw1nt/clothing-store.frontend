<script setup lang="ts">
import Product from "~/scripts/data/product";
import {ProductRequestGroup} from "~/scripts/requests-groups/product-request-group";
import {getImage} from "~/scripts/http/http-configuration";
import {isAuthorized, accessToken} from "~/scripts/authentication-storage";
import Authentication from "~/scripts/http/authentication";
import {useUserStore} from "~/scripts/stores/user-store";

const route = useRoute();
const productRequest = new ProductRequestGroup()
const product = ref({} as Product)
const store = useUserStore();

const createReviewDialogVisible = ref(false)

function addToCart() {
    if (isAuthorized.value == false) {
        useRouter().push('/login');
    } else {
        store.addProductToCart({productId: product.value.id, count: 1});
    }
}

onBeforeMount(async () => {
    await productRequest.getProduct(route.params.id as any, x => product.value = x)
})
</script>

<template>
    <div>
        <el-dialog v-model="createReviewDialogVisible"
                   title="Warning"
                   width="30%"
                   align-center>
            <span>Content</span>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="createReviewDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createReviewDialogVisible = false">
          Confirm
        </el-button>
      </span>
            </template>
        </el-dialog>

        <page-header header="Новинки"></page-header>
        <div class="grid grid-cols-8">
            <div class="col-span-2"/>
            <div class="col-span-5">
                <div class="flex">
                    <el-image :src="getImage(product.imageUrl)" alt="none"/>
                    <div class="ml-10 min-w-[50%]">
                        <div class="text-xl">
                            {{ product.name }}
                        </div>
                        <div class="text-xl mt-1 font-medium text-gray-600">
                            {{ product.price }}₽
                        </div>

                        <div class="mt-5"/>

                        <div class="grid grid-cols-8 flex items-center"
                             v-if="product.color != null && product.color != ''">
                            <div class="text-sm col-span-2 text-gray-500 font-medium uppercase mr-5">
                                Цвет
                            </div>
                            <div class="text-start">
                                {{ product.color }}
                            </div>
                        </div>
                        <div class="grid grid-cols-8 flex items-center mt-2">
                            <div class="col-span-2 text-sm text-gray-500 font-medium uppercase">
                                Размер
                            </div>
                            <el-button-group class="col-span-4">
                                <el-button type="outline">XS</el-button>
                                <el-button type="outline">S</el-button>
                                <el-button type="outline">M</el-button>
                                <el-button type="outline">L</el-button>
                            </el-button-group>
                        </div>

                        <div class="flex items-center">
                        </div>
                        <div class="w-1/2">
                            <el-divider/>
                        </div>
                        <el-button @click="addToCart" class="w-1/2" size="large">Добавить в корзину</el-button>

                        <div class="outline outline-1 outline-offset-8 outline-gray-300 rounded-md h-1/2 mt-11">
                            <p v-if="product.description != null" class="p-1">{{ product.description }}</p>
                            <p v-else class="text-lg text-gray-500">Нет описания</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-8 mt-20">
            <div class="col-span-2">
            </div>
            <div class="col-span-5">
                <div class="flex items-center">
                    <p class="text-2xl align-base">Отзывы</p>
                    <el-button @click="createReviewDialogVisible = true" v-if="isAuthorized" plain class="ml-2"
                               size="small">Написать
                    </el-button>
                </div>
                <el-divider/>
                <div v-if="product.reviews != undefined && product.reviews.length > 0">
                    <div v-for="review in product.reviews" class="mt-5 outline outline-1">
                        <p>{{ review.title }}</p>
                        <p class="mt-5">{{ review.content }}</p>
                    </div>
                </div>
                <page-header v-else header="На этот товар пока нет отзывов"></page-header>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>