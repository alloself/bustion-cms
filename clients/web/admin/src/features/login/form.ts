import { IFormField } from "@/shared/types";
import { ref, computed, Ref } from "vue";
import * as yup from "yup";

export default function (): Ref<IFormField[]> {
    const showPassword = ref(false);

    const fields = ref<IFormField[]>([
        {
            component: "v-text-field",
            key: "email",
            props: {
                autocomplete: "username",
                label: "Почта",
                name: "login",
                prependIcon: "mdi-mail",
                type: "text",
            },
            rule: yup.string().required().email(),
        },
        {
            component: "v-text-field",
            key: "password",
            props: {
                autocomplete: "current-password",
                appendInnerIcon: computed(() =>
                    showPassword.value ? "mdi-eye" : "mdi-eye-off"
                ),
                label: "Пароль",
                name: "password",
                prependIcon: "mdi-lock",
                type: computed(() => (showPassword.value ? "text" : "password")),
            },
            events: {
                "click:appendInner": () => (showPassword.value = !showPassword.value),
            },
            rule: yup.string().required().min(8),
        },
    ]);

    return fields;
}
