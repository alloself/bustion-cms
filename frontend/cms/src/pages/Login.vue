<template>
  <CompanyLayout>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center" no-gutters class="fill-height">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12" @keyup.enter="onSubmit">
            <v-toolbar dark flat>
              <Logo></Logo>
              <v-toolbar-title>Вход</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <smart-form
                :fields="loginFields"
                :onInitialized="(f: FormContext) => form = f"
              ></smart-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed @click="onSubmit" :loading="loading">Вход</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </CompanyLayout>
</template>
<script lang="ts" setup>
import { FormContext } from "vee-validate";
import { defineAsyncComponent, provide, ref } from "vue";
import loginFields from "@/fields/login";
import CompanyLayout from "@/components/CompanyLayout.vue";
import { useUserStore } from "@/stores/user";
import { router } from "@/router";

const Logo = defineAsyncComponent(() => import("@/components/Logo.vue"));
const SmartForm = defineAsyncComponent(
  () => import("@/components/SmartForm.vue")
);
const loading = ref(false);
const form = ref<FormContext>();
const userStore = useUserStore();
const onSubmit = async () => {
  try {
    await userStore.login(form.value?.values);
    router.push("/");
  } catch (e: any) {
    const formErrors = e?.response.data.errors;
    if (formErrors) {
      form.value?.setErrors(formErrors);
    }
  }
};

provide("form", form);
</script>
