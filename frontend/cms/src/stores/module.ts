import { IFormField } from "@/fields/index";
import { defineStore } from "pinia";

export interface IModule {
  fields: IFormField[];
  icon: string;
  key: string;
  title: string;
}

export const useModuleStore = defineStore("module", {
  state: () => {
    return {
      modules: {} as Record<string, IModule>,
    };
  },
  actions: {
    setModules(modules: Record<string, IModule>) {
      this.modules = modules;
    },
  },
});
