import { createApp } from 'vue/dist/vue.esm-bundler.js';
import { toggleModalVisibility } from './modal.js'
import 'aos/dist/aos.css'
import * as AOS from 'aos'
import { initBGBlock, initHeader, initMainSlider, initMenu, initProjectSlider } from './utils.js'

const app = createApp({
    methods: {
        toggleModalVisibility
    }
});


app.mount("#app");


window.IS_TOUCH = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Touch/i.test(navigator.userAgent)

if (IS_TOUCH) {
    document.body.classList.add('is-touch')
}

document.addEventListener('DOMContentLoaded', (e) => {
    setTimeout(() => {
        initMenu()
        initBGBlock()
        initHeader()
        initProjectSlider()
        initMainSlider()
    }, 0)
    AOS.init()
})
