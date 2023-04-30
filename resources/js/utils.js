import Swiper, { HashNavigation, Mousewheel, Navigation } from 'swiper'
import SwiperAnimation from '@cycjimmy/swiper-animation'

export function initMenu() {
	const $menuTrigger = document.querySelector('.js-menu-trigger')
	const $menuCanvas = document.querySelector('.js-menu-canvas')
	const $menuClose = document.querySelector('.js-menu-close')
	const $menuItems = document.querySelectorAll('.js-menu-item')

	$menuTrigger &&
		$menuTrigger.addEventListener('click', (e) => {
			$menuCanvas.classList.toggle('is-open')
		})

	$menuClose &&
		$menuClose.addEventListener('click', (e) => {
			$menuCanvas.classList.remove('is-open')
		})

	$menuItems.forEach(($item) => {
		$item.addEventListener('click', (e) => {
			$menuCanvas.classList.remove('is-open')
		})
	})
}

export function initBGBlock() {
	const $bgBlock = document.querySelector('.js-bg-block')
	if (window.location.pathname !== '/') {
		$bgBlock && $bgBlock.classList.add('is-inited')
	}
}

export function initHeader() {
	const $header = document.querySelector('.js-header')

	window.addEventListener('scroll', (e) => {
		if ($header.classList.contains('bs-header--inner') && window.scrollY > 0) {
			if (!$header.classList.contains('bs-header--sticky')) {
				$header.classList.add('bs-header--sticky')
			}
		} else {
			$header.classList.remove('bs-header--sticky')
		}
	})
}

export function initScrollTop() {
	const $scrollTop = document.querySelector('.js-scroll-top')

	$scrollTop &&
		$scrollTop.addEventListener('click', (e) => {
			e.preventDefault()
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		})
}

export function initProjectSlider() {
	const $projectSlider = document.querySelectorAll('.js-project-slider')

	$projectSlider.forEach(($slider) => {
		const $swiperTrigger = $slider.querySelector('.js-project-slider-swiper')
		const $label = $slider.querySelector('.js-project-slider-label')
		const $title = $slider.querySelector('.js-project-slider-title')
		const $desc = $slider.querySelector('.js-project-slider-desc')
		const $swiperPrev = $slider.querySelector('.js-project-slider-prev')
		const $swiperNext = $slider.querySelector('.js-project-slider-next')

		function currentSlide(direction) {
			let activeSlide = $swiperTrigger.querySelector('.swiper-slide.is-current')
			let siblingElem

			if (direction == 'next') {
				siblingElem = activeSlide.nextElementSibling
			} else if (direction == 'prev') {
				siblingElem = activeSlide.previousElementSibling
			} else if (direction == 'current') {
				siblingElem = activeSlide
			}

			if (siblingElem) {
				activeSlide.classList.remove('is-current')
				siblingElem.classList.add('is-current')
				$label.innerText = siblingElem.dataset.label
				$title.innerText = siblingElem.dataset.title
				$desc.innerText = siblingElem.dataset.desc
			}
		}

		const swiper = new Swiper($swiperTrigger, {
			simulateTouch: false,
			modules: [Navigation],
			speed: 700,
			spaceBetween: 0,
			centeredSlides: true,
			slidesPerView: 'auto',
			breakpoints: {
				1024: {
					centeredSlides: false,
				},
			},
			on: {
				init: function () {
					const $activeSlide = $swiperTrigger.querySelector('.swiper-slide.swiper-slide-active')
					$activeSlide.classList.add('is-current')
					currentSlide('current')
				},
			},
		})

		$swiperPrev &&
			$swiperPrev.addEventListener('click', (e) => {
				swiper.slidePrev()
				currentSlide('prev')
			})

		$swiperNext &&
			$swiperNext.addEventListener('click', (e) => {
				swiper.slideNext()
				currentSlide('next')
			})
	})
}

function initVerticalSlider() {
	const $swiperTriggers = document.querySelectorAll('.js-vertical-slider')

	$swiperTriggers.forEach(($trigger) => {
		const swiper = new Swiper($trigger, {
			direction: 'vertical',
			slidesPerView: 'auto',
			simulateTouch: false,
			autoHeight: true,
			centeredSlides: true,
			speed: 700,
			spaceBetween: 50,
		})

		$trigger.addEventListener('mousewheel', function (event) {
			let delta

			if (event.wheelDelta) {
				delta = event.wheelDelta
			} else {
				delta = -1 * event.deltaY
			}

			if (delta < 0) {
				// scroll down
				if (swiper.isEnd && !swiper.animating) {
					return
				} else {
					swiper.slideNext()
					event.stopPropagation()
				}
			} else if (delta > 0) {
				// scroll up
				if (swiper.activeIndex == 0 && !swiper.animating) {
					return
				} else {
					swiper.slidePrev()
					event.stopPropagation()
				}
			}
		})
	})
}

export function initMainSlider() {
	const $mainSwiper = document.querySelector('.js-main-slider-swiper')
	const $slideName = document.querySelector('.js-slide-name')
	const $slideActive = document.querySelector('.js-slide-active')
	const $slideLength = document.querySelector('.js-slide-length')

	const swiperAnimation = new SwiperAnimation()

	function setSliderInfo(swiper) {
		$slideName.innerText = swiper.slides[swiper.activeIndex].dataset.name
		$slideActive.innerText = swiper.activeIndex + 1
		$slideLength.innerText = swiper.slides.length
	}

	const swiper = new Swiper($mainSwiper, {
		simulateTouch: false,
		modules: [HashNavigation, Mousewheel],
		speed: 700,
		spaceBetween: 0,
		slidesPerView: 1,
		hashNavigation: true,
		mousewheel: {
			invert: false,
		},
		on: {
			init(swiper) {
				swiperAnimation.init(swiper).animate()
				setSliderInfo(swiper)
			},
			slideChange(swiper) {
				swiperAnimation.init(swiper).animate()
				setSliderInfo(swiper)
			},
		},
	})

	initVerticalSlider()
}
