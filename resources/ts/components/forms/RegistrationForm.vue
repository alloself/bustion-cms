<template>
    <form @submit.prevent="onSubmit">
        <div
            class="app-form-field mb-4"
            aria-label="Поле обязательно для заполнения"
            data-cooltipz-dir="top-right"
            data-cooltipz-theme="danger"
            data-cooltipz-visible
        >
            <input
                type="text"
                class="app-form-control text-[16px] font-normal"
                placeholder="Ваше имя"
            />
        </div>
        <div class="app-form-field mb-4">
            <input
                type="email"
                class="app-form-control text-[16px] font-normal"
                placeholder="Эл. почта"
            />
        </div>
        <div class="app-form-field mb-4">
            <input
                type="password"
                class="app-form-control text-[16px] font-normal"
                placeholder="Пароль"
            />
        </div>
        <div class="app-form-field mb-4">
            <input
                type="password"
                class="app-form-control text-[16px] font-normal"
                placeholder="Повторите пароль"
            />
        </div>
        <label class="mb-6 flex items-center text-[12px] text-black">
            <div class="app-checkmark mr-2">
                <input type="checkbox" />
                <div class="svg-icon">
                    <svg><use xlink:href="#checkmark"></use></svg>
                </div>
            </div>
            <div>
                я согласен с условиями
                <a href="/politika-konfidencialnosti" class="underline hover:no-underline"
                    >политики конфиденциальности</a
                >
            </div>
        </label>
        <div class="mb-12 flex items-center gap-7">
            <button type="submit" class="app-button app-button--secondary">
                Зарегистрироваться
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
async function onSubmit() {}
</script>
