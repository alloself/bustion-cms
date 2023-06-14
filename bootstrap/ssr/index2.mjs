import { Navigation, Thumbs } from "swiper";
import Swiper from "swiper/bundle";
const selector = (el, all = false) => {
  el = el.trim();
  if (all) {
    el = [...document.querySelectorAll(el)];
  } else {
    el = document.querySelector(el);
  }
  if (!el) {
    return;
  }
  return el;
};
const on = (el, event, func) => {
  if (typeof el === "string")
    el = selector(el);
  if (!el) {
    return;
  }
  return el.addEventListener(event, func);
};
const menuButton = selector(".menu-btn");
const menuLinks = selector(".menu");
let setPause = true;
const toggleMenu = () => {
  [menuButton, menuLinks, selector(".backdrop")].forEach(
    (el) => el.classList.toggle("active")
  );
  setTimeout(() => setPause = true, 500);
};
on(menuLinks, "click", (event) => {
  const target = event.target;
  const index = target.dataset.indexMenu;
  if (index && setPause) {
    setPause = false;
    swiper.slideTo(index - 1);
    toggleMenu();
  }
});
on(menuButton, "click", () => {
  if (setPause) {
    setPause = false;
    toggleMenu();
  }
});
if (selector(".fullscreen-swiper")) {
  const swiper2 = new Swiper(".fullscreen-swiper", {
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    },
    navigation: {
      nextEl: ".step-card",
      prevEl: ".swiper-prev"
    },
    mousewheel: {
      invert: false
    },
    speed: 800,
    effect: "fade",
    loop: true,
    fadeEffect: {
      crossFade: false
    },
    on: {
      init: function() {
        selector(".swiper-slide[data-theme-dark]", true).forEach(
          (el) => el.classList.add("text-color-dark")
        );
      }
    }
  });
  swiper2.on("slideChangeTransitionEnd", function() {
    const activeSlide = selector(".swiper-slide-active[data-theme-dark]");
    if (activeSlide) {
      menuButton.classList.add("theme-dark");
    } else if (menuButton.classList.contains("theme-dark")) {
      menuButton.classList.remove("theme-dark");
    }
  });
}
if (selector(".js-gallery-main-slider")) {
  const thumbsSlider = new Swiper(".js-gallery-thumbs-slider", {
    modules: [Navigation],
    speed: 800,
    spaceBetween: 8,
    loop: false,
    navigation: {
      nextEl: ".js-gallery-preview-next",
      prevEl: ".js-gallery-preview-prev"
    },
    slidesPerView: 2,
    breakpoints: {
      420: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 4
      },
      1024: {
        slidesPerView: 5
      }
    }
  });
  const mainSlider = new Swiper(".js-gallery-main-slider", {
    modules: [Navigation, Thumbs],
    speed: 800,
    spaceBetween: 8,
    slidesPerView: 1,
    loop: false,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".js-gallery-main-slider-next",
      prevEl: ".js-gallery-main-slider-prev"
    },
    thumbs: {
      swiper: thumbsSlider
    }
  });
  console.log(mainSlider);
}
