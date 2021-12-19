<template>
  <detail namespace="template">
    <template #form="{ setValue, entity }">
      <v-text-field
        label="Значение"
        outlined
        :value="entity.name"
        @input="(val) => setValue('name', val)"
      ></v-text-field>
      <v-text-field
        label="Название"
        outlined
        :value="entity.title"
        @input="(val) => setValue('title', val)"
      ></v-text-field>
      <content-editor
        :value="entity.content"
        @input="(val) => setValue('content', val)"
      ></content-editor>
    </template>
  </detail>
</template>
