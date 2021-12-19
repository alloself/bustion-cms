<template>
  <list namespace="block" :headers="headers"></list>
</template>
<script>
export default {
  metaInfo: {
    title: "Блоки",
  },
  data: () => ({
    headers: [
      { text: "#", value: "id" },
      { text: "Название", value: "name" },
    ],
  }),
};
</script>
