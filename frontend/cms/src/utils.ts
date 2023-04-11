import { useRoute } from "vue-router";
import isEqual from "lodash/isEqual";
import localforage from "localforage";
export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getModuleKeyByRoute = () => {
  const route = useRoute();

  return route.meta.module as string;
};

export const getChangedFormFields = (
  initialValues: Record<string, unknown>,
  values: Record<string, unknown> | undefined
) => {
  if (!values) {
    return;
  }

  const chanfedFields = {} as Record<string, unknown>;

  for (const key in values) {
    if (!isEqual(values[key], initialValues[key])) {
      chanfedFields[key] = values[key];
    }
  }

  return chanfedFields;
};
