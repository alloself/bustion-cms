<template>
  <CompanyLayout>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12" @keyup.enter="auth">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Вход</v-toolbar-title>
              <v-spacer></v-spacer>
              <div class="d-flex align-center">
                <a class="logo">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52.2 58.51"
                  >
                    <title>Bustion</title>
                    <g>
                      <path
                        class="color-1"
                        d="M23.63.65a5,5,0,0,1,4.94,0l10.58,6,10.49,6.17a5,5,0,0,1,2.46,4.27l.1,12.16-.1,12.17a5,5,0,0,1-2.46,4.27L39.15,51.86l-10.58,6a5.05,5.05,0,0,1-4.94,0l-10.58-6L2.56,45.69A5,5,0,0,1,.1,41.42L0,29.25.1,17.09a5,5,0,0,1,2.46-4.27L13.05,6.65Z"
                      />
                      <path
                        class="color-2"
                        d="M26.1,9l8.11,4.6,8,4.73.07,9.32L42.25,37l-8,4.72-8.11,4.6L18,41.68,10,37l-.07-9.33L10,18.31l8-4.73Z"
                      />
                      <path
                        class="color-2"
                        d="M34.21,13.58,26.1,9v37.3l8.11-4.6,8-4.72.07-9.33-.07-9.32Z"
                      />
                      <path
                        class="color-2"
                        d="M34.21,37.09,26.1,32.5,18,37.09l-8,4.73,8,4.73,8.11,4.59,8.11-4.59,8-4.73Z"
                      />
                    </g>
                  </svg>
                </a>
              </div>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Почта"
                  outlined
                  rounded
                  dark
                  color="primary"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  outlined
                  rounded
                  dark
                  color="primary"
                  label="Пароль"
                  name="password"
                  prepend-icon="mdi-lock"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="login-actions">
              <v-btn
                class="my-3"
                block
                color="primary"
                depressed
                @click="auth"
                :loading="loading"
                >Войти</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </CompanyLayout>
</template>
<script>
import { mapActions } from "vuex";
export default {
  metaInfo: {
    title: "Вход",
    titleTemplate: "%s | Панель управдения контентом",
  },
  data: () => ({
    showPassword: false,
    email: "",
    password: "",
    loading: false,
  }),
  methods: {
    ...mapActions("alerts", ["pushAlert"]),
    ...mapActions("auth", ["login"]),
    async auth() {
      try {
        this.loading = !this.loading;
        await this.login({
          email: this.email,
          password: this.password,
        });
        this.$router.push("/");
      } catch (e) {
        this.pushAlert({
          type: "error",
          content: e?.data?.exception || "Произошла техническая ошибка",
        });
      } finally {
        this.loading = !this.loading;
      }
    },
  },
};
</script>
