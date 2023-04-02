import { useModuleStore } from "@/stores/module";

export const setupModules = async (moduleKeys: string[]) => {
  const moduleStore = useModuleStore();

  const modules = await moduleKeys.reduce((acc, module) => {
    import(`@/modules/${module}.ts`).then(async (data) => {
      const fields = await import(`@/fields/${module}.ts`);
      acc[data.key] = { ...data, getFields: fields.default };
    });

    return acc;
  }, {} as Record<string, any>);

  moduleStore.setModules(modules);
};
