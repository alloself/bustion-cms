import { IFormField } from "@/fields/index";
import { defineStore } from "pinia";
import { Ref } from "vue";

export interface IModule {
  getFields: (options: {
    entity?: Record<string, unknown>;
    predefinedValues?: Record<string, unknown>;
  }) => Ref<IFormField[]>;
  icon: string;
  key: string;
  title: string;
  headers?: Array<Record<string, unknown>>;
  list?: boolean;
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
