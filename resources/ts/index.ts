// styles
import 'swiper/css'
import 'cooltipz-css'
import '@/resources/scss/index.scss'

// scripts
import {
    initArticlesItemSlider,
    initTapeSlider,
    initProductItemSlider,
    initSlideShow,
    initMainBannersSlider,
} from '@/resources/ts/scripts/initSliders'
import { initScrollAnimate } from '@/resources/ts/scripts/initScrollAnimate'
import { initContactsMap } from '@/resources/ts/scripts/initYandexMap'
import { initThreeObjects } from '@/resources/ts/scripts/initThreeObjects'

// vue imports
import { createApp } from 'vue/dist/vue.esm-bundler.js'

// vue directives
import ScrollToDirective from '@/resources/ts/directives/ScrollTo'
import ModalDirective from '@/resources/ts/directives/Modal'

// vue global components
import Details from '@/resources/ts/components/common/Details.vue'
import GeoLocation from '@/resources/ts/components/common/GeoLocation.vue'
import GeoLocationList from '@/resources/ts/components/common/GeoLocationList.vue'
import AppSearch from '@/resources/ts/components/common/AppSearch.vue'
import Accordion from '@/resources/ts/components/common/Accordion.vue'
import AppTabs from '@/resources/ts/components/common/AppTabs.vue'
import Pagination from '@/resources/ts/components/common/Pagination.vue'
import AppSort from '@/resources/ts/components/common/AppSort.vue'
import AppSelect from '@/resources/ts/components/common/AppSelect.vue'
import MobileMenuBurger from '@/resources/ts/components/common/MobileMenuBurger.vue'
import MobileFiltersBurger from '@/resources/ts/components/common/MobileFiltersBurger.vue'
import CountButtons from '@/resources/ts/components/common/CountButtons.vue'
import OrderDetails from '@/resources/ts/components/common/OrderDetails.vue'
import Offcanvas from '@/resources/ts/components/common/Offcanvas.vue'
import OffcanvasClose from '@/resources/ts/components/common/OffcanvasClose.vue'
import AppModal from '@/resources/ts/components/common/AppModal.vue'
import PickUpPoints from '@/resources/ts/components/common/PickUpPoints.vue'
import LoginForm from '@/resources/ts/components/forms/LoginForm.vue'
import RegistrationForm from '@/resources/ts/components/forms/RegistrationForm.vue'
import PasswordRecoveryForm from '@/resources/ts/components/forms/PasswordRecoveryForm.vue'
import OrderForm from '@/resources/ts/components/forms/OrderForm.vue'
import PersonalDataForm from '@/resources/ts/components/forms/PersonalDataForm.vue'
import PersonalPasswordForm from '@/resources/ts/components/forms/PersonalPasswordForm.vue'
import CallbackForm from '@/resources/ts/components/forms/CallbackForm.vue'

createApp()
    .directive('scroll-to', ScrollToDirective)
    .directive('modal-call', ModalDirective)
    .component('appdetails', Details)
    .component('countbuttons', CountButtons)
    .component('loginform', LoginForm)
    .component('callbackform', CallbackForm)
    .component('registrationform', RegistrationForm)
    .component('passwordrecoveryform', PasswordRecoveryForm)
    .component('personaldataform', PersonalDataForm)
    .component('personalpasswordform', PersonalPasswordForm)
    .component('orderform', OrderForm)
    // .component('OrderDetails', OrderDetails)
    .component('appsearch', AppSearch)
    .component('geolocation', GeoLocation)
    .component('geolocationlist', GeoLocationList)
    .component('accordion', Accordion)
    .component('apptabs', AppTabs)
    .component('pagination', Pagination)
    .component('appsort', AppSort)
    .component('appselect', AppSelect)
    .component('mobilefiltersburger', MobileFiltersBurger)
    .component('mobilemenuburger', MobileMenuBurger)
    .component('offcanvas', Offcanvas)
    .component('offcanvasclose', OffcanvasClose)
    .component('appmodal', AppModal)
    .component('pickuppoints', PickUpPoints)
    .mount('#app')

document.addEventListener('DOMContentLoaded', () => {
    // initArticlesItemSlider()
    // initProductItemSlider()
    // initMainBannersSlider()
    // initSlideShow()
    // initTapeSlider()
})

window.onload = () => {
    // initScrollAnimate()
    // initContactsMap()
    initThreeObjects()
}
