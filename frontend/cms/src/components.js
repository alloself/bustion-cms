import Vue from "vue";

const requireComponent = require.context(
  "./",
  true,
  /components\/[A-Z]\w+\.(vue)$/
);

requireComponent.keys().forEach((fileName) => {
  const name = fileName.replace(/^.*[\\/]/, "").replace(/\.[^.]+$/, "");

  Vue.component(name, (resolve) => {
    require([`@/components/${name}`], resolve);
  });
});
