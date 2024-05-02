<template>
    <form @submit.prevent="onSubmit">
        <div class="app-form-field mb-4">
            <input type="text" class="app-form-control text-[16px] font-normal" placeholder="Введите свой логин">
        </div>
        <div class="app-form-field mb-6">
            <input type="password" class="app-form-control text-[16px] font-normal" placeholder="Введите свой пароль">
        </div>
        <div class="mb-12 flex items-center gap-7">
            <button type="submit" class="app-button app-button--secondary">Войти</button>
            <router-link 
                :to="{name: 'password-recovery'}" 
                class="text-dark text-opacity-40 font-semibold underline hover:no-underline"
            >Забыли пароль?</router-link>
        </div>
    </form>
</template>

<script setup lang="ts">
async function onSubmit() {}
</script>