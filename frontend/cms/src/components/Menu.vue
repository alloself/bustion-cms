<template>
  <v-navigation-drawer v-model="drawer" app dark>
    <v-list dense rounded>
      <v-list-item
        link
        exact
        v-for="(item, index) in menu"
        :key="index"
        :to="item.to"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
  }),
  computed: {
    menu() {
      return [];
    },
  },
};
</script>
