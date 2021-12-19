<template>
  <detail namespace="menuItem">
    <template #form="{ setValue, entity }">
      <v-text-field
        label="Название"
        outlined
        :value="entity.title"
        @input="(val) => setValue('title', val)"
      ></v-text-field>
      <v-text-field
        label="Ссылка"
        outlined
        :value="entity.link"
        @input="(val) => setValue('link', val)"
      ></v-text-field>
      <picker
        label="Родительский пункт"
        model="menuItem"
        url="menu-item"
        textSelector="title"
        :value="entity.parent_id"
        @input="(val) => setValue('parent_id', val)"
      ></picker>
      <attributes-picker
        :value="entity.attributes"
        @input="(val) => setValue('attributes', val)"
      ></attributes-picker>
    </template>
  </detail>
</template>
<script>
export default {
  metaInfo: {
    title: "Меню",
  },
};
</script>
