<script setup lang="ts">
import {getAuthentication} from "~/scripts/authentication-storage";
import PageHeader from "~/components/page-header.vue";
import {CartItem} from "~/scripts/data/cart-item";
import {getImage} from "~/scripts/http/http-configuration";
import {CartRequestGroup} from "~/scripts/requests-groups/cart-request-group";
import {CheckoutRequest} from "~/scripts/request-models/checkout-request";
import {LocalUserCart} from "~/scripts/stores/local-user-cart";
import {required, email, minLength, helpers} from '@vuelidate/validators';
import {useVuelidate} from '@vuelidate/core';
import {vMaska} from "maska"

const localUserCart = new LocalUserCart();
const cartRequest = new CartRequestGroup(getAuthentication());
const cartItems = ref([] as CartItem[]);

const orderInfo = reactive<CheckoutRequest>({} as CheckoutRequest);

const resultPrice = computed(() => {
    let sum = 0
    cartItems.value.forEach(element => {
        sum += element.product.price * element.count
    })

    return sum;
})

const requiredMessage = helpers.withMessage('Обязательное поле', required);
const incorrectEmail = helpers.withMessage('Некорректный адрес электронной почты', email)
const incorrectPhoneMessage = helpers.withMessage('Некорректный формат', minLength('+0 (000) 000-00-00'.length))

const rules = computed(() => {
    return {
        name: {
            required: requiredMessage
        },
        phoneNumber: {
            required: requiredMessage,
            minLength: incorrectPhoneMessage
        },
        email: {
            required: requiredMessage,
            email: incorrectEmail
        },
        address: {
            required: requiredMessage
        }
    };
});
const v$ = useVuelidate(rules, orderInfo);

async function removeItemFromCart(index: number) {
    const response = await cartRequest.removeItem(cartItems.value[index].id);

    if (response.errors == null) {
        cartItems.value.splice(index, 1);
    } else {
        ElNotification.error(response.errors[0])
    }
}

async function checkout() {
    await v$.value.$validate()
    if (v$.value.$error) {
        return
    }

    orderInfo.cartItems = cartItems.value;
    const response = await cartRequest.checkout(orderInfo);
    console.log(response)
    if (response.errors != null) {
        let errorMessage = '';

        const keys = Object.keys(response.errors);
        keys.forEach(key => {
            errorMessage += `${response.errors![key]}\n\n`
        })

        ElNotification.error(errorMessage)
    } else {
        localUserCart.set(0);
        cartItems.value = [];
    }
}

onBeforeMount(async () => {
    await cartRequest.getItems(x => cartItems.value = x);
})
</script>

<template>
    <div>
        <page-header header="Корзина"></page-header>
        <div class="grid grid-cols-8">
            <div class="col-span-2"/>
            <div class="col-span-4">
                <div v-if="cartItems.length == 0">
                    <p class="text-2xl">Ваша корзина пуста</p>
                </div>
                <div v-else>
                    <div v-for="(item, index) in cartItems" class="mt-5">
                        <div class="grid grid-cols-9 gap-x-10">
                            <el-image :preview-src-list="[getImage(item.product.imageUrl)]"
                                      :src="getImage(item.product.imageUrl)"/>
                            <div class="col-span-4">
                                <p class="uppercase text-gray-500 text-sm">{{ item.product.name }}</p>
                            </div>
                            <div class="col-span-2 flex items-center">
                                <el-input-number class=" h-10" v-model="item.count" :min="1"/>
                            </div>
                            <p class="flex items-center text-lg">{{ item.product.price }}₽</p>
                            <div class="flex items-center">
                                <icon size="24"
                                      @click="removeItemFromCart(index)"
                                      class="text-gray-700 cursor-pointer hover:text-red-500"
                                      name="ph:trash"/>
                            </div>
                        </div>
                        <el-divider/>
                    </div>
                    <p class="text-lg font-medium text-gray-700 mt-10">ОФОРМЛЕНИЕ ЗАКАЗА</p>
                    <form class="grid grid-cols-3 mt-10">
                        <div class="col-span-2">
                            <div class="grid grid-cols-6 items-center justify-items-start mb-3">
                                <p class="text-sm col-span-2">Фамилия/Имя:</p>
                                <el-input id="name"
                                          name="name"
                                          @change="v$.name.$touch()"
                                          class="col-span-3"
                                          v-model="orderInfo.name"
                                          placeholder="Фамилия/Имя:"/>
                                <span class="col-start-3 col-span-3 text-xs text-red-500"
                                      v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</span>
                            </div>

                            <div class="grid grid-cols-6 items-center justify-items-start mb-3">
                                <p class="text-sm col-span-2">Телефон:</p>
                                <el-input @change="v$.phoneNumber.$touch()"
                                          v-model="orderInfo.phoneNumber"
                                          v-maska
                                          data-maska="+7 (###) ###-##-##"
                                          class="col-span-3"
                                          placeholder="+7(___)___-__-__"/>
                                <span class="col-start-3 col-span-3 text-xs text-red-500"
                                      v-if="v$.phoneNumber.$error">{{ v$.phoneNumber.$errors[0].$message }}</span>
                            </div>
                            <div class="grid grid-cols-6 items-center justify-items-start mb-3 ">
                                <p class="text-sm col-span-2">E-mail:</p>
                                <el-input id="email"
                                          name="email"
                                          @change="v$.email.$touch()"
                                          v-model="orderInfo.email"
                                          class="col-span-3"
                                          placeholder="E-mail:"/>
                                <span class="col-start-3 col-span-3 text-xs text-red-500"
                                      v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
                            </div>
                            <div class="grid grid-cols-6 justify-items-start mb-3">
                                <p class="text-sm col-span-2">Комментарий:</p>
                                <el-input v-model="orderInfo.comment" class="col-span-3" type="textarea"
                                          placeholder="Комментарий:"/>
                            </div>
                            <div class="grid grid-cols-6 items-center justify-items-start mb-3">
                                <p class="text-sm col-span-2">Адрес доставки:</p>
                                <el-input id="email"
                                          name="email"
                                          @change="v$.address.$touch()"
                                          v-model="orderInfo.address"
                                          class="col-span-3"
                                          placeholder="Город, населённый пункт, дом, квартира"/>
                                <span class="col-start-3 col-span-3 text-xs text-red-500"
                                      v-if="v$.address.$error">{{ v$.address.$errors[0].$message }}</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-x-5 h-24">
                            <p class="uppercase text-md text-left">Сумма заказа:</p>
                            <p class="text-md text-right">{{ resultPrice }} ₽</p>

                            <p class="uppercase text-md text-left">Доставка:</p>
                            <p class="text-md text-right">0 ₽</p>

                            <p class="uppercase text-md text-left">Скидка:</p>
                            <p class="text-md text-right">- ₽</p>

                            <el-button @click="checkout" type="primary" class="col-span-2 uppercase p-2 mt-5"
                                       size="large">Оформить
                                заказ
                            </el-button>
                        </div>
                        <!--                        <el-form class="mt-10">
                                                    <el-form-item label="Фамилия/Имя">
                                                        <el-input class="ml-10 col-span-2"></el-input>
                                                    </el-form-item>
                                                </el-form>-->
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>