
import { defineStore } from "pinia";
import { ref } from "vue";
import { IAppModule } from "@/entities/module";

export const useModuleStore = defineStore("module", () => {


    const modules = ref<Record<string, IAppModule>>({})



    return {
        modules
    }
});