<template>
    <v-layout>
        <app-navigation-drawer></app-navigation-drawer>
        <app-bar></app-bar>
        <app-view>
            <slot></slot>
        </app-view>
        <app-modals-drawer></app-modals-drawer>
    </v-layout>
</template>
  
<script lang="ts" setup>
import AppBar from '@/widgets/layouts/Authenticated/AppBar.vue';
import AppNavigationDrawer from '@/widgets/layouts/Authenticated/AppNavigationDrawer.vue';
import AppModalsDrawer from '@/widgets/layouts/Authenticated/AppModalsDrawer.vue';
import AppView from '@/widgets/layouts/Authenticated/AppView.vue';
import { provide } from 'vue';
import { ref } from 'vue';
import { onBeforeUnmount, onMounted } from "vue";

const menuDrawer = ref(true);

provide('menuDrawer', menuDrawer)

let HTMLDOMElement: HTMLHtmlElement | null;

onMounted(() => {
    HTMLDOMElement = document.querySelector("html");
    if (HTMLDOMElement) {
        HTMLDOMElement.style.overflow = "hidden";
    }
});
onBeforeUnmount(() => {
    if (HTMLDOMElement) {
        HTMLDOMElement.style.overflow = "auto";
    }
});

</script>
  