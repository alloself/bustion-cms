<template>
  <list namespace="menuItem" :headers="headers"></list>
</template>
<script>
export default {
  metaInfo: {
    title: "Меню",
  },
  data: () => ({
    headers: [
      { text: "#", value: "id" },
      { text: "Название", value: "name" },
    ],
  }),
};
</script>
