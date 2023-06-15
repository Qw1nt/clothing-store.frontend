<script setup lang="ts">
import {IdentityRequestGroup} from "~/scripts/requests-groups/identity-request-group";
import {useVuelidate} from "@vuelidate/core";
import {sameAs, minLength, helpers, required} from '@vuelidate/validators';

const formModel = reactive({
    login: '',
    password: '',
    confirmPassword: null
})

const requestGroup = new IdentityRequestGroup()
const showSuccessDialog = ref(false);

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
        confirmPassword: {
            required: requiredMessage,
            minLength: minLengthMessage,
            sameAs: helpers.withMessage('Пароли не совпадают', sameAs(formModel.password)),
        },
    };
});

const v$ = useVuelidate(rules, formModel);

async function tryRegister() {
    await v$.value.$validate();
    if (v$.value.$error) {
        return
    }
    
    const response = await requestGroup.register({
        login: formModel.login,
        password: formModel.password
    }, x => showSuccessDialog.value = true)
    
    if(response.errors != null){
        ElNotification.error(response.errors);
    }
}

function endRegistration(){
    useRouter().push('/login');
}
</script>

<template>
    <el-dialog
        v-model="showSuccessDialog"
        @update:model-value="() => endRegistration()"
        title="Регистрация прошла успешно!"
        width="30%"
        align-center>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="showSuccessDialog = false">Ок</el-button>
      </span>
        </template>
    </el-dialog>
    
    <page-header header="Авторизация"></page-header>
    <div class="grid grid-cols-2">
        <div class="flex justify-center">
            <img class="aspect-auto	w-3/4 ml-5" src="~/assets/identity-page.png"/>
        </div>
        <div class="flex h-full items-center justify-center">
            <div class="w-1/2 rounded-xl p-5 py-8 bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
                <p class="text-2xl text-center mb-5">
                    Регистрация
                </p>
                <el-input @change="v$.login.$touch()" placeholder="Логин" v-model="formModel.login"/>
                <span v-if="v$.login.$error" class="text-xs text-red-500 mb-5">{{v$.login.$errors[0].$message}}</span>
                
                <el-input @change="v$.password.$touch()" 
                          class="mt-1" 
                          id="password"
                          name="password"
                          placeholder="Пароль"
                          type="password"
                          show-password
                          v-model="formModel.password"/>
                <span v-if="v$.password.$error" class="text-xs text-red-500 mb-5">{{v$.password.$errors[0].$message}}</span>
                
                <el-input @change="v$.confirmPassword.$touch()" 
                          class="mt-1"
                          placeholder="Подтверждение пароля"
                          type="password"
                          show-password
                          v-model="formModel.confirmPassword"/>
                <span v-if="v$.confirmPassword.$error" class="text-xs text-red-500">{{v$.confirmPassword.$errors[0].$message}}</span>
                
                <div class="w-full flex justify-end mt-1">
                    <!--                    <p class="mr-auto text-sm cursor-pointer text-sky-500 hover:text-sky-300">Забыли пароль?</p>-->
                    <p class="text-sm">Уже есть аккаунт? <a class="text-sky-500 cursor-pointer hover:text-sky-300" @click="useRouter().push('/login')">Войдите</a>
                    </p>
                </div>
                <el-button @click="tryRegister" class="w-full mt-14 mb-5" type="primary">Зарегистрироваться</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>