<template>
    <div class="flex items-center" @click="offcanvasToggle('mobileCatalogFilters')">
        <div class="svg-icon text-brand mr-2">
            <svg><use xlink:href="#filters"></use></svg>
        </div>
        <div class="text-[16px] tracking-[-0.32px] font-semibold">Фильтры</div>
    </div>
</template>

<script setup lang="ts">
import { offcanvasToggle } from '@/resources/ts/composables/useOffcanvas'
</script>
