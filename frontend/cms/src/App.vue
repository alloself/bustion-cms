<template>
  <v-app>
    <transition name="fade-transition" mode="out-in">
      <router-view></router-view>
    </transition>
    <div>
      <v-snackbar
        app
        top
        right
        v-for="(alert, index) in alerts"
        :key="index"
        :value="true"
        :color="alert.type"
        :style="getOffsetStyle(index)"
        :timeout="-1"
        >{{ alert.content }}
        <template v-slot:action="{ attrs }">
          <v-btn icon v-bind="attrs" @click="closeAlert(index)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template></v-snackbar
      >
    </div>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("alerts", ["alerts"]),
  },
  methods: {
    ...mapActions("alerts", ["closeAlert"]),
    getOffsetStyle(index) {
      return {
        transform: `translateY(${index * 64}px)`,
      };
    },
  },
};
</script>
<style lang="scss">
.v-text-field {
  &__slot {
    input {
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        box-shadow: 0 0 0 30px #1e1e1e inset !important;
        -webkit-text-fill-color: white !important;
      }
    }
  }
}
</style>
