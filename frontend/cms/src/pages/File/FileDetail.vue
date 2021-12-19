<template>
  <detail namespace="file" formData>
    <template #form="{ setValue, entity, createView }">
      <v-file-input
        v-if="createView"
        return-object
        label="Файл"
        outlined
        accept="file/*"
        :value="entity.file"
        @change="(val) => setValue('file', val)"
      ></v-file-input>
      <img :src="entity.path" v-else />
    </template>
  </detail>
</template>
