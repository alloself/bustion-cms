import { IModal } from "@/shared/types";
import { defineStore } from "pinia";
import { markRaw, ref } from "vue";

export const useModalsStore = defineStore("modals", () => {
  const show = ref(false);

  const modals = ref<IModal[]>([]);

  const addModal = (modal: IModal) => {
    const component = markRaw(modal.component);
    modals.value.push({
      props: modal.props,
      actions: modal.actions,
      component,
    });
  };

  const onModalClose =  () => {
    modals.value = modals.value.toSpliced(-1, 1);
  }

 

  return {
    modals,
    show,
    addModal,
    onModalClose
  };
});
