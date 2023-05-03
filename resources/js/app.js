import { createApp } from 'vue/dist/vue.esm-bundler.js';
import { toggleModalVisibility, modalVisibility } from './modal.js'
import 'aos/dist/aos.css'
import * as AOS from 'aos'
import { initBGBlock, initHeader, initMainSlider, initMenu, initProjectSlider } from './utils.js'

const app = createApp({
    methods: {
        toggleModalVisibility,
        clickHandler(event) {
            if (event.target.hasAttribute('data-bs-modal')) {
                toggleModalVisibility()
            }
        }
    },
    setup() {

        return {
            modalVisibility
        }
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
