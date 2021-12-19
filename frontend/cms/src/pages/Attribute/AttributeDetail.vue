<template>
  <detail namespace="attribute">
    <template #form="{ setValue, entity }">
      <v-text-field
        label="Название"
        outlined
        :value="entity.name"
        @input="(val) => setValue('name', val)"
      ></v-text-field>
      <v-text-field
        label="Заголовок"
        outlined
        :value="entity.title"
        @input="(val) => setValue('title', val)"
      ></v-text-field>
    </template>
  </detail>
</template>
