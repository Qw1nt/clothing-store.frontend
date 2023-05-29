<script setup lang="ts">
import Product from "~/scripts/data/product";
import {ProductRequestGroup} from "~/scripts/requests-groups/product-request-group";
import {getImage} from "~/scripts/http/http-configuration";
import {isAuthorized, getAuthentication} from "~/scripts/authentication-storage";
import {useUserStore} from "~/scripts/stores/user-store";
import {email, helpers, minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

const route = useRoute();
const productRequest = new ProductRequestGroup(getAuthentication());
const product = ref({} as Product)
const store = useUserStore();
import {formatData} from "~/scripts/date-formatter"

const createReviewDialogVisible = ref(false)

const createReviewForm = reactive({
    title: '',
    content: ''
})

const requiredMessage = helpers.withMessage('Обязательное поле', required);
const minLengthRu = helpers.withMessage('Минимальная длина - 10 символов', minLength(10))

const rules = computed(() => {
    return {
        title: {
            required: requiredMessage
        },
        content: {
            required: requiredMessage,
            minLength: minLengthRu
        }
    };
});
const v$ = useVuelidate(rules, createReviewForm);

function addToCart() {
    if (isAuthorized.value == false) {
        useRouter().push('/login');
    } else {
        store.addProductToCart({productId: product.value.id, count: 1});
    }
}

async function createReview() {
    await v$.value.$validate()
    if (v$.value.$error) {
        return
    }

    const response = await productRequest.createReview({
            productId: product.value.id,
            title: createReviewForm.title,
            content: createReviewForm.content
        },
        x => {
            if (product.value.reviews == undefined) {
                product.value.reviews = []
            }
            createReviewDialogVisible.value = false;
            product.value.reviews.push(x)
        })

    if (response.errors != null) {
        ElNotification.error(response.errors);
    }
}

function brakeCreationReview() {
    createReviewForm.title = '';
    createReviewForm.content = '';
    createReviewDialogVisible.value = false;
}

onBeforeMount(async () => {
    await productRequest.getProduct(route.params.id as any, x => product.value = x)
})
</script>

<template>
    <div>
        <el-dialog v-model="createReviewDialogVisible"
                   title="Создание отзыва"
                   width="30%"
                   align-center>

            <el-input @change="v$.title.$touch()"
                      v-model="createReviewForm.title"
                      placeholder="Заголовок"/>
            <span class="col-start-3 col-span-3 text-xs text-red-500"
                  v-if="v$.title.$error">{{ v$.title.$errors[0].$message }}</span>

            <el-input @change="v$.content.touch()"
                      class="mt-1"
                      v-model="createReviewForm.content"
                      :autosize="{ minRows: 5, maxRows: 10 }"
                      type="textarea"
                      placeholder="Содержание"/>
            <span class="col-start-3 col-span-3 text-xs text-red-500"
                  v-if="v$.content.$error">{{ v$.content.$errors[0].$message }}</span>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="brakeCreationReview()">Отмена</el-button>
                    <el-button type="primary" @click="createReview()">Создать</el-button>
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
                    <div v-for="review in product.reviews"
                         class="">
                        <p class="text-xl font-medium">{{ review.title }}</p>
                        <p class="mt-3 text-lg">{{ review.content }}</p>

                        <div class="grid grid-cols-12 mt-5">
                            <p class="font-medium">Автор:</p>
                            <p class="ml-3">{{review.owner.login}}</p>
                            <div class="col-span-10"></div>             
                            
                            <p class="font-medium">Дата:</p>
                            <p class="ml-3 col-span-2">{{formatData(review.date)}}</p>
                            <div class="col-span-8"></div>
                        </div>
                        <el-divider></el-divider>
                    </div>
                </div>
                <page-header v-else header="На этот товар пока нет отзывов"></page-header>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>