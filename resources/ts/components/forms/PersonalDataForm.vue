<template>
    <form class="grid gap-7 md:grid-cols-2" @submit.prevent="onSubmit">
        <label>
            <div class="text-dark text-opacity-50 text-[14px]">Фамилия:</div>
            <input type="text" class="app-form-control text-[20px]" value="Иванов">
        </label>
        <label>
            <div class="text-dark text-opacity-50 text-[14px]">Имя:</div>
            <input type="text" class="app-form-control text-[20px]" value="Имя">
        </label>
        <label>
            <div class="text-dark text-opacity-50 text-[14px]">Отчество:</div>
            <input type="tel" class="app-form-control text-[20px]" value="Иванович">
        </label>
        <label>
            <div class="text-dark text-opacity-50 text-[14px]">Телефон:</div>
            <input type="tel" class="app-form-control text-[20px]" value="+7 911 600 00 00">
        </label>
        <label>
            <div class="text-dark text-opacity-50 text-[14px]">E-mail:</div>
            <input type="email" class="app-form-control text-[20px]" value="ivanivan@gmail.com">
        </label>
        <label class="flex items-center text-dark text-opacity-50 text-[14px] font-semibold md:col-span-2">
            <div class="app-checkmark w-[24px] h-[24px] mr-3">
                <input type="checkbox" checked name="agreement">
                <div class="svg-icon">
                    <svg><use xlink:href="#checkmark"></use></svg>
                </div>
            </div>
            <div>Получать рассылку</div>
        </label>
        <div class="flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center md:col-span-2">
            <button type="submit" class="app-button app-button--dark">Сохранить</button>
            <a
                href="#"
                @click.prevent="$router.go(-1)"
                class="app-button app-button--secondary xl:hidden"
            >вернуться назад</a>
        </div>
    </form>
</template>

<script setup lang="ts">
async function onSubmit() {}
</script>