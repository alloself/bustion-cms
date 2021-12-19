<template>
  <list namespace="page" :headers="headers"></list>
</template>
<script>
export default {
  metaInfo: {
    title: "Страницы",
  },
  data: () => ({
    headers: [
      { text: "#", value: "id" },
      { text: "Заголовок", value: "title" },
    ],
  }),
};
</script>
