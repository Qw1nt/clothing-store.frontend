<script setup lang="ts">
import {IdentityRequestGroup} from "~/scripts/requests-groups/identity-request-group";
import {getAuthentication, setAccessToken} from "~/scripts/authentication-storage";
import {useUserStore} from "~/scripts/stores/user-store";
import {helpers, minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {IdentityResponse} from "~/scripts/response-models/identity-response";

const formModel = reactive({
    login: '',
    password: '',
})

const requestGroup = new IdentityRequestGroup()

const requiredMessage = helpers.withMessage('Обязательное поле', required);
const minLengthMessage = helpers.withMessage('Минимальная длина - 8 символов', minLength(8))

const rules = computed(() => {
    return {
        login: {
            required: requiredMessage
        },
        password: {
            required: requiredMessage,
            minLength: minLengthMessage,
        },
    };
});

const v$ = useVuelidate(rules, formModel);
async function tryLogin() {
    await v$.value.$validate();
    if(v$.value.$error){
        return
    }
    
    const response = await requestGroup.login({
        login: formModel.login,
        password: formModel.password
    }, async x => await successLogin(x))
    console.log(response)
    if(response.errors){
        ElNotification.error(response.errors)
    }
}

async function successLogin(identityResponse: IdentityResponse){
    setAccessToken(identityResponse.accessToken!);
    const userStore = useUserStore()
    await userStore.syncWithLocalstorage()

    await useRouter().push('/profile')
}
</script>

<template>
    <page-header header="Авторизация"></page-header>
    <div class="grid grid-cols-2">
        <div class="flex justify-center">
            <img class="aspect-auto	w-3/4 ml-5" src="identity-page.png"/>
        </div>
        <div class="flex h-full items-center justify-center">
            <div class="w-1/2 rounded-xl p-5 py-8 bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
                <p class="text-2xl text-center mb-5">
                    Вход
                </p>
                <el-input @change="v$.login.$touch()" placeholder="Логин" v-model="formModel.login"/>
                <span v-if="v$.login.$error" class="text-xs text-red-500 mb-5">{{v$.login.$errors[0].$message}}</span>
                
                <el-input @change="v$.login.$touch()" class="mt-1" placeholder="Пароль" type="password" v-model="formModel.password"/>
                <span v-if="v$.password.$error" class="text-xs text-red-500 mb-5">{{v$.password.$errors[0].$message}}</span>
                
                <div class="w-full flex justify-end mt-1">
                    <!--                    <p class="mr-auto text-sm cursor-pointer text-sky-500 hover:text-sky-300">Забыли пароль?</p>-->
                    <p class="text-sm">Нет аккаунта? <a class="text-sky-500 cursor-pointer hover:text-sky-300" @click="useRouter().push('/registration')">Зарегистрируйтесь!</a>
                    </p>
                </div>
                <el-button @click="tryLogin" class="w-full mt-14 mb-5" type="primary">Войти</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>