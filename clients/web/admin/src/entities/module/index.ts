import { useModuleStore } from "@/entities/module/store";
import { capitalize, kebabize } from "@/shared/utils";
import Authenticated from "@/app/layouts/Authenticated.vue";
import { RouteRecordRaw } from "vue-router";
import { IFormField, IGetFieldsOptions } from "@/shared/types";

export interface IAppModule {
  key: string;
  title: string;
  getFields: (options: IGetFieldsOptions) =>IFormField[];
  icon: string;
  headers: Array<Record<string, any>>;
  list: boolean;
}

export const getModuleRoutes = (key: string) => {
  const rootList = {
    path: `/${key}`,
    meta: {
      layout: Authenticated,
    },
    name: `${capitalize(key)}List`,
    component: () => import(`@/entities/${key}/components/List.vue`),
  } as RouteRecordRaw;

  if (key === import.meta.env.VITE_APP_DEFAULT_ALIAS) {
    rootList.alias = "";
  }

  return [
    rootList,
    {
      path: `/${key}/create`,
      meta: {
        layout: Authenticated,
      },
      name: `${capitalize(key)}Create`,
      component: () => import(`@/entities/${key}/components/Detail.vue`),
    },
    {
      path: `/${key}/:id`,
      meta: {
        layout: Authenticated,
      },
      name: `${capitalize(key)}Detail`,
      component: () => import(`@/entities/${key}/components/Detail.vue`),
    },
  ] as RouteRecordRaw[];
};

export const setupModules = async (moduleKeys: string[]) => {

  console.log(moduleKeys)

  const moduleStore = useModuleStore();

  const modules = await moduleKeys.reduce(async (acc, module) => {
    const memo = await acc;

    const data: IAppModule = await import(
      `../../shared/modules/${module}.ts`
    );

    const fields: { default: () => IFormField[] } = await import(
      `../../shared/fabrics/fields/${module}.ts`
    );

    const key = data.key;
    memo[key] = { ...data, getFields: fields.default };

    return memo;
  }, Promise.resolve({}) as Promise<Record<string, IAppModule>>);

  moduleStore.modules = modules;
};

export const generateModulesRoutes = (modules: string[]) => {
  return modules.flatMap((module) => getModuleRoutes(kebabize(module)));
};
