import { createApp } from "vue/dist/vue.esm-bundler.js";
import { ref } from "vue";
import * as AOS from "aos";
import Swiper, { Navigation, HashNavigation } from "swiper";
import SwiperAnimation from "@cycjimmy/swiper-animation";
import { debounce } from "throttle-debounce";
const modalVisibility = ref(false);
const toggleModalVisibility = () => {
  modalVisibility.value = !modalVisibility.value;
  if (modalVisibility.value) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }
};
const aos = "";
function initMenu() {
  const $menuTrigger = document.querySelector(".js-menu-trigger");
  const $menuCanvas = document.querySelector(".js-menu-canvas");
  const $menuClose = document.querySelector(".js-menu-close");
  const $menuItems = document.querySelectorAll(".js-menu-item");
  $menuTrigger && $menuTrigger.addEventListener("click", (e) => {
    $menuCanvas.classList.toggle("is-open");
  });
  $menuClose && $menuClose.addEventListener("click", (e) => {
    $menuCanvas.classList.remove("is-open");
  });
  $menuItems.forEach(($item) => {
    $item.addEventListener("click", (e) => {
      $menuCanvas.classList.remove("is-open");
    });
  });
}
function initBGBlock() {
  const $bgBlock = document.querySelector(".js-bg-block");
  if (window.location.pathname !== "/") {
    $bgBlock && $bgBlock.classList.add("is-inited");
  }
}
function initHeader() {
  const $header = document.querySelector(".js-header");
  window.addEventListener("scroll", (e) => {
    if ($header.classList.contains("bs-header--inner") && window.scrollY > 0) {
      if (!$header.classList.contains("bs-header--sticky")) {
        $header.classList.add("bs-header--sticky");
      }
    } else {
      $header.classList.remove("bs-header--sticky");
    }
  });
}
function initProjectSlider() {
  const $projectSlider = document.querySelectorAll(".js-project-slider");
  $projectSlider.forEach(($slider) => {
    const $swiperTrigger = $slider.querySelector(".js-project-slider-swiper");
    const $label = $slider.querySelector(".js-project-slider-label");
    const $title = $slider.querySelector(".js-project-slider-title");
    const $desc = $slider.querySelector(".js-project-slider-desc");
    const $swiperPrev = $slider.querySelector(".js-project-slider-prev");
    const $swiperNext = $slider.querySelector(".js-project-slider-next");
    function currentSlide(direction) {
      let activeSlide = $swiperTrigger.querySelector(".swiper-slide.is-current");
      let siblingElem;
      if (direction == "next") {
        siblingElem = activeSlide.nextElementSibling;
      } else if (direction == "prev") {
        siblingElem = activeSlide.previousElementSibling;
      } else if (direction == "current") {
        siblingElem = activeSlide;
      }
      if (siblingElem) {
        activeSlide.classList.remove("is-current");
        siblingElem.classList.add("is-current");
        $label.innerText = siblingElem.dataset.label;
        $title.innerText = siblingElem.dataset.title;
        $desc.innerText = siblingElem.dataset.desc;
      }
    }
    const swiper = new Swiper($swiperTrigger, {
      simulateTouch: false,
      modules: [Navigation],
      speed: 500,
      spaceBetween: 0,
      centeredSlides: true,
      slidesPerView: "auto",
      breakpoints: {
        1024: {
          centeredSlides: false
        }
      },
      on: {
        init() {
          const $activeSlide = $swiperTrigger.querySelector(".swiper-slide.swiper-slide-active");
          $activeSlide.classList.add("is-current");
          currentSlide("current");
        }
      }
    });
    $swiperPrev && $swiperPrev.addEventListener("click", (e) => {
      swiper.slidePrev();
      currentSlide("prev");
    });
    $swiperNext && $swiperNext.addEventListener("click", (e) => {
      swiper.slideNext();
      currentSlide("next");
    });
  });
}
function initMainSliderMousewheel(parentSwiperInstance) {
  let debounceDuration = 200;
  parentSwiperInstance.el.addEventListener("mousewheel", debounce(debounceDuration, (event) => {
    let delta;
    if (event.wheelDelta) {
      delta = event.wheelDelta;
    } else {
      delta = -1 * event.deltaY;
    }
    if (event.target.closest(".js-vertical-slider-item") || event.target.classList.contains(".js-vertical-slider-item")) {
      const currentVerticalSlider = event.target.closest(".js-vertical-slider").swiper;
      if (delta < 0) {
        currentVerticalSlider.slideNext();
        if (currentVerticalSlider.isEnd && !currentVerticalSlider.animating) {
          parentSwiperInstance.slideNext();
        }
      }
      if (delta > 0) {
        currentVerticalSlider.slidePrev();
        if (currentVerticalSlider.isBeginning && !currentVerticalSlider.animating) {
          parentSwiperInstance.slidePrev();
        }
      }
    } else {
      if (delta < 0 && !parentSwiperInstance.animating) {
        parentSwiperInstance.slideNext();
      }
      if (delta > 0 && !parentSwiperInstance.animating) {
        parentSwiperInstance.slidePrev();
      }
    }
  }, { noLeading: true }));
}
function initVerticalSlider() {
  const $verticalSliders = document.querySelectorAll(".js-vertical-slider");
  $verticalSliders.forEach(($swiperElement) => {
    new Swiper($swiperElement, {
      direction: "vertical",
      slidesPerView: "auto",
      simulateTouch: false,
      autoHeight: true,
      centeredSlides: true,
      speed: 500,
      spaceBetween: 0
    });
  });
}
function initMainSlider() {
  const $mainSwiper = document.querySelector(".js-main-slider-swiper");
  const $slideName = document.querySelector(".js-slide-name");
  const $slideActive = document.querySelector(".js-slide-active");
  const $slideLength = document.querySelector(".js-slide-length");
  const swiperAnimation = new SwiperAnimation();
  function setSliderInfo(swiper) {
    $slideName.innerText = swiper.slides[swiper.activeIndex].dataset.name;
    $slideActive.innerText = swiper.activeIndex + 1;
    $slideLength.innerText = swiper.slides.length;
  }
  new Swiper($mainSwiper, {
    modules: [HashNavigation],
    simulateTouch: false,
    speed: 500,
    spaceBetween: 0,
    slidesPerView: 1,
    hashNavigation: {
      watchState: true
    },
    on: {
      init(swiper) {
        swiperAnimation.init(swiper).animate();
        setSliderInfo(swiper);
        initMainSliderMousewheel(swiper);
        initVerticalSlider();
      },
      slideChange(swiper) {
        swiperAnimation.init(swiper).animate();
        setSliderInfo(swiper);
      }
    }
  });
}
const app = createApp({
  methods: {
    toggleModalVisibility,
    clickHandler(event) {
      if (event.target.hasAttribute("data-bs-modal")) {
        toggleModalVisibility();
      }
    }
  },
  setup() {
    return {
      modalVisibility
    };
  }
});
app.mount("#app");
window.IS_TOUCH = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Touch/i.test(navigator.userAgent);
if (IS_TOUCH) {
  document.body.classList.add("is-touch");
}
document.addEventListener("DOMContentLoaded", (e) => {
  setTimeout(() => {
    initMenu();
    initBGBlock();
    initHeader();
    initProjectSlider();
    initMainSlider();
  }, 0);
  AOS.init();
});
