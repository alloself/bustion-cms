<template>
    <form
        class="app-search" 
        :class="{'is-open': state.isOpen}"
        @submit.prevent="onSubmit"
        @keydown.esc="onToggleSearch"
    >
        <input 
            ref="inputRef"
            class="w-full border-none h-full outline-none text-center"
            type="text" 
            placeholder="Введите поисковый запрос"
        >
    </form>
    <div
        v-if="state.isOpen === false" 
        class="svg-icon svg-icon--stroke svg-icon--nofill text-brand cursor-pointer" 
        @click="onToggleSearch"
    >
        <svg><use xlink:href="#search"></use></svg>
    </div>
    <div 
        v-if="state.isOpen === true" 
        class="svg-icon text-brand cursor-pointer" 
        @click="onToggleSearch"
    >
        <svg><use xlink:href="#close"></use></svg>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const inputRef = ref<HTMLInputElement>()

const state = reactive({
    isOpen: false
})

function onToggleSearch() {
    state.isOpen = !state.isOpen

    if (state.isOpen) {
        setTimeout(() => {
            inputRef?.value?.focus({
                preventScroll: true
            })
        }, 10)
    }
}

async function onSubmit() {}
</script>

<style lang="scss">
.app-search {
    @apply
        absolute
        right-8
        left-0
        top-0
        bottom-0
        transition-all
        duration-300
        opacity-0
        pointer-events-none
        bg-white
    ;
    
    &.is-open {
        @apply 
            opacity-100
            pointer-events-auto
        ;
    }
}
</style>