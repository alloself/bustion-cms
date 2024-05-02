<template>
    <form @submit.prevent="onSubmit">
        <div class="app-form-field mb-6">
            <input type="email" class="app-form-control text-[16px] font-normal" placeholder="Введите Ваш e-mail">
        </div>
        <div class="mb-12 flex items-center gap-7">
            <button type="submit" class="app-button app-button--secondary">Восстановить</button>
            <a 
                href="#"
                class="text-dark text-opacity-40 font-semibold underline hover:no-underline"
                @click.prevent="$router.go(-1)"
            >Вернуться назад</a>
        </div>
    </form>
</template>

<script setup lang="ts">
async function onSubmit() {}
</script>