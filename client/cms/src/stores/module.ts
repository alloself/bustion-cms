import { IFormField } from "@/fields/index";
import { defineStore } from "pinia";
import { Ref } from "vue";

export type SelectItemKey = boolean | string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any);
export type DataTableHeader = {
  key: string;
  title: string;
  colspan?: number;
  rowspan?: number;
  fixed?: boolean;
  align?: "start" | "end" | "center";
  width?: number | string;
  minWidth?: string;
  maxWidth?: string;
  sortable?: boolean;
  value?: SelectItemKey;
};

export interface IModule {
  getFields: (options: {
    entity?: Record<string, unknown>;
    predefinedValues?: Record<string, unknown>;
  }) => Ref<IFormField[]>;
  icon: string;
  key: string;
  title: string;
  headers?: DataTableHeader[];
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
