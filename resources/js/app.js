import { createApp } from 'vue/dist/vue.esm-bundler.js';
import { toggleModalVisibility } from './reactive/modal.js'
const app = createApp({
    methods: {
        toggleModalVisibility
    }
});


app.mount("#app");
