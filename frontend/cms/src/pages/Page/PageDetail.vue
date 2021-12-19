<template>
  <detail namespace="page">
    <template #form="{ setValue, entity, createView }">
      <v-text-field
        label="Заголовок"
        outlined
        :value="entity.title"
        @input="(val) => setValue('title', val)"
      ></v-text-field>
      <picker
        label="Шаблон"
        model="template"
        textSelector="title"
        :value="entity.template_id"
        @input="(val) => setValue('template_id', val)"
      ></picker>
      <v-text-field
        label="Ссылка"
        outlined
        readonly
        :value="entity.path"
      ></v-text-field>
      <v-text-field
        label="Meta description"
        outlined
        :value="entity.description"
        @input="(val) => setValue('description', val)"
      ></v-text-field>
      <v-text-field
        label="Meta keywords"
        outlined
        :value="entity.keywords"
        @input="(val) => setValue('keywords', val)"
      ></v-text-field>
      <v-checkbox
        :value="entity.index"
        @change="(val) => setValue('index', Boolean(val))"
        label="Главная страница"
      ></v-checkbox>
      <picker
        label="Родительская странциа"
        model="page"
        textSelector="title"
        :value="entity.parent_id"
        @input="(val) => setValue('parent_id', val)"
      ></picker>
      <picker
        multiple
        label="Изображения"
        model="file"
        :query="{ type: 'image' }"
        textSelector="name"
        :value="entity.images"
        @input="(val) => setValue('images', val)"
      ></picker>
      <attributes-picker
        :value="entity.attributes"
        @input="(val) => setValue('attributes', val)"
      ></attributes-picker>
      <edit-list
        title="Блоки"
        relationPicker
        v-if="!createView"
        :value="entity.blocks"
        @input="(val) => setValue('blocks', val)"
      ></edit-list>
    </template>
  </detail>
</template>
<script>
export default {
  metaInfo: {
    title: "Страницы",
  },
};
</script>
