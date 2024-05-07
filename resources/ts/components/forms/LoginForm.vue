<template>
    <form @submit.prevent="onSubmit">
        <div class="app-form-field mb-4">
            <input
                type="text"
                class="app-form-control text-[16px] font-normal"
                placeholder="Введите свой логин"
            />
        </div>
        <div class="app-form-field mb-6">
            <input
                type="password"
                class="app-form-control text-[16px] font-normal"
                placeholder="Введите свой пароль"
            />
        </div>
        <div class="mb-12 flex items-center gap-7">
            <button type="submit" class="app-button app-button--secondary">Войти</button>
            <a
                href="/vosstanovlenie-parolia"
                class="text-dark text-opacity-40 font-semibold underline hover:no-underline"
                >Забыли пароль?</a
            >
        </div>
    </form>
</template>

<script setup lang="ts">
async function onSubmit() {}
</script>
