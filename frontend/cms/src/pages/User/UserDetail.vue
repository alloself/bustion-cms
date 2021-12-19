<template>
  <detail namespace="user">
    <template #form="{ setValue, entity }">
      <v-text-field
        label="Баланс"
        outlined
        :value="entity.balance"
        @input="(val) => setValue('balance', val)"
      ></v-text-field>
    </template>
  </detail>
</template>
