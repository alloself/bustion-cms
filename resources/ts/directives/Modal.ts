import { modalToggle } from "@/resources/ts/composables/useModal";
import { orderID } from "@/resources/ts/composables/useOrderDetails";

function clickHandler(binding: Record<string, any>, event: Event) {
    event.preventDefault();
    if (binding.value.name) {
        modalToggle(binding.value.name);
    }
    if (binding.value.orderID) {
        orderID.value = +binding.value.orderID;
    }
}

export default {
    mounted(el: HTMLElement, binding: any) {
        el.addEventListener("click", clickHandler.bind(undefined, binding));
    },
    unmounted(el: HTMLElement, binding: any) {
        el.removeEventListener("click", clickHandler.bind(undefined, binding));
    },
};
