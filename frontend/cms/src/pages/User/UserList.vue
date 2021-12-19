<template>
  <list namespace="user" :headers="headers"></list>
</template>
<script>
export default {
  data: () => ({
    headers: [
      { text: "#", value: "id" },
      { text: "Имя", value: "first_name" },
      { text: "Email", value: "email" },
    ],
  }),
};
</script>
