import Swiper from 'swiper'
import { randomNumberBetween } from '@/resources/ts/utils/utils'
import { Pagination, Navigation } from 'swiper/modules'

export function initArticlesItemSlider(): Swiper | Swiper[] {
    const slider = new Swiper('.js-article-item-slider', {
        modules: [Pagination],
        speed: 600,
        spaceBetween: 20,
        slidesPerView: 1,
        pagination: {
            clickable: true,
            el: '.slider-pagination',
            renderBullet(index: number, className: string) {
                return `
                    <div class="slider-pagination__item ${className}"></div>
                `
            },
        },
    })

    return slider
}

export function initTapeSlider(): Swiper | Swiper[] {
    const slider = new Swiper('.js-tape-slider', {
        slidesPerView: 'auto',
        speed: 600,
        spaceBetween: 0,
        centeredSlides: true,
        centeredSlidesBounds: true,
    })

    return slider
}

export function initProductItemSlider(): Swiper | Swiper[] {
    const slider = new Swiper('.js-product-item-slider', {
        modules: [Pagination, Navigation],
        speed: 600,
        spaceBetween: 20,
        slidesPerView: 1,
        navigation: {
            prevEl: '.slider-prev',
            nextEl: '.slider-next',
        },
        pagination: {
            clickable: true,
            el: '.slider-pagination',
            renderBullet(index: number, className: string) {
                return `
                    <div class="slider-pagination__item ${className}"></div>
                `
            },
        },
    })

    return slider
}

export function initSlideShow(): Swiper | Swiper[] {
    const slider = new Swiper('.js-slide-show', {
        modules: [Pagination, Navigation],
        speed: 600,
        spaceBetween: 0,
        slidesPerView: 1,
        navigation: {
            prevEl: '.slider-prev',
            nextEl: '.slider-next',
        },
        pagination: {
            clickable: true,
            el: '.slider-pagination',
            renderBullet(index: number, className: string) {
                return `
                    <div class="slider-pagination__item ${className}"></div>
                `
            },
        },
        // for dev
        on: {
            init(swiper) {
                swiper.slideTo(randomNumberBetween(1, 6) - 1)
            },
        },
    })

    return slider
}

export function initMainBannersSlider(): Swiper | Swiper[] {
    const slider = new Swiper('.js-main-banner-slider', {
        modules: [Pagination, Navigation],
        speed: 600,
        spaceBetween: 0,
        slidesPerView: 1,
        simulateTouch: false,
        navigation: {
            prevEl: '.slider-prev',
            nextEl: '.slider-next',
        },
        pagination: {
            clickable: true,
            el: '.slider-pagination',
            renderBullet(index: number, className: string) {
                return `
                    <div class="slider-pagination__item ${className}"></div>
                `
            },
        },
    })

    return slider
}
