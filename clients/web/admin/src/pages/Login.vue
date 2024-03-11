<template>
  <v-container class="fill-height" fluid>
    <v-row :align="'center'" justify="center" no-gutters class="fill-height">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12" @keyup.enter="onSubmit">
          <v-toolbar dark flat>
            <Logo></Logo>
            <v-toolbar-title>Вход</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <smart-form :fields="formFields"></smart-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed @click="onSubmit" :loading="loading">Вход</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import { FormContext } from "vee-validate";
import { provide, ref } from "vue";
import loginFields from "@/features/login/form";
import { useUserStore } from "@/entities/user/store";
import router from "@/app/router";
import SmartForm from "@/shared/components/SmartForm.vue";
import Logo from "@/shared/components/Logo.vue";

const loading = ref(false);
const form = ref<FormContext>();
const userStore = useUserStore();
const onSubmit = async () => {
  try {
    loading.value = true;
    const user = await userStore.login(form.value?.values);

    if (user) {
      router.push("/");
    }
  } catch (e: any) {
    const formErrors = e?.response.data.errors;
    if (formErrors) {
      form.value?.setErrors(formErrors);
    }
  } finally {
    loading.value = false;
  }
};

const formFields = loginFields();

provide("form", form);
provide("loading", loading);
</script>
