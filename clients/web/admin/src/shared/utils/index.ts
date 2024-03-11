import { useRoute } from "vue-router";
import isEqual from "lodash/isEqual";

export const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getModuleKeyByRoute = () => {
    const route = useRoute();

    return route.meta.module as string;
};

export const getChangedFormFields = (
    initialValues: Record<string, unknown> = {},
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



export const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
    }
}

export const kebabize = (str: string) =>
    str.replace(
        /[A-Z]+(?![a-z])|[A-Z]/g,
        ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
    );

    