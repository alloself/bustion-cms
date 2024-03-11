<template>
  <v-sheet variant="outlined" :border="true" rounded class="mb-6">
    <v-toolbar density="compact" dark>
      <v-btn-group v-if="editor" multiple class="flex">
        <v-menu
          v-model="showLink"
          :close-on-content-click="false"
          location="right"
          offset="16"
        >
          <template v-slot:activator="menu">
            <v-btn
              v-bind="{ ...menu.props }"
              size="x-small"
              :color="editor.isActive('link') ? 'primary' : 'transparent'"
              :rounded="0"
            >
              <v-icon>mdi-link-variant</v-icon>
            </v-btn>
          </template>

          <v-card width="500">
            <v-card-title>Ссылка</v-card-title>
            <v-card-text class="mt-2">
              <v-row>
                <v-col>
                  <v-text-field v-model="link"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn variant="text" @click="(showLink = false), (link = '')">
                Отмена
              </v-btn>
              <v-btn color="primary" variant="text" @click="addLink">
                Добавить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        <v-btn
          size="x-small"
          :color="editor.isActive(key) ? 'primary' : 'transparent'"
          :rounded="0"
          v-for="(action, key) of actions"
          :key="key"
          @click="action.action()"
        >
          <v-icon>{{ action.icon }}</v-icon>
        </v-btn>
      </v-btn-group></v-toolbar
    >
    <v-sheet class="p-4" dark variant="outlined" rounded>
      <editor-content :editor="editor" />
    </v-sheet>
  </v-sheet>
</template>

<script setup lang="ts">
import { useEditor, EditorContent, type Content } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import Link from "@tiptap/extension-link";

const props = defineProps<{ modelValue?: Content }>();
const emits = defineEmits(["update:model-value"]);

const showLink = ref(false);
const link = ref("");

const editor = useEditor({
  extensions: [StarterKit, Link],
  onUpdate: ({ editor }) => {
    emits("update:model-value", editor.getHTML());
  },
});

const actions = ref({
  unlink: {
    action: () => editor.value?.commands.unsetLink(),
    icon: "mdi-link-off",
  },
  bold: {
    action: () => editor.value?.chain().focus().toggleBold().run(),
    icon: "mdi-format-bold",
  },
  italic: {
    action: () => editor.value?.chain().focus().toggleItalic().run(),
    icon: "mdi-format-italic",
  },
  strike: {
    action: () => editor.value?.chain().focus().toggleStrike().run(),
    icon: "mdi-format-strikethrough",
  },
  clear: {
    action: () => editor.value?.chain().focus().unsetAllMarks().run(),
    icon: "mdi-format-clear",
  },
  codeBlock: {
    action: () => editor.value?.chain().focus().toggleCodeBlock().run(),
    icon: "mdi-code-tags",
  },
  paragraph: {
    action: () => editor.value?.chain().focus().setParagraph().run(),
    icon: "mdi-format-paragraph",
  },
  h1: {
    action: () =>
      editor.value?.chain().focus().toggleHeading({ level: 1 }).run(),
    icon: "mdi-format-header-1",
  },
  h2: {
    action: () =>
      editor.value?.chain().focus().toggleHeading({ level: 2 }).run(),
    icon: "mdi-format-header-2",
  },
  h3: {
    action: () =>
      editor.value?.chain().focus().toggleHeading({ level: 3 }).run(),
    icon: "mdi-format-header-3",
  },
  h4: {
    action: () =>
      editor.value?.chain().focus().toggleHeading({ level: 4 }).run(),
    icon: "mdi-format-header-4",
  },
  h5: {
    action: () =>
      editor.value?.chain().focus().toggleHeading({ level: 5 }).run(),
    icon: "mdi-format-header-5",
  },
  h6: {
    action: () =>
      editor.value?.chain().focus().toggleHeading({ level: 6 }).run(),
    icon: "mdi-format-header-6",
  },
  bulletList: {
    action: () => editor.value?.chain().focus().toggleBulletList().run(),
    icon: "mdi-format-list-bulleted",
  },
  orderedList: {
    action: () => editor.value?.chain().focus().toggleOrderedList().run(),
    icon: "mdi-format-list-numbered",
  },
  undo: {
    action: () => editor.value?.commands.undo(),
    icon: "mdi-undo",
  },
  redo: {
    action: () => editor.value?.commands.redo(),
    icon: "mdi-redo",
  },
});

const addLink = () => {
  editor.value?.commands.setLink({
    href: link.value,
    target: "_blank",
  });
  showLink.value = false;
  link.value = "";
};

onBeforeUnmount(() => {
  editor.value?.destroy();
});

onMounted(() => {
  if (props.modelValue) {
    editor.value?.commands.insertContent(props.modelValue);
  }
});

watch(
  () => props.modelValue,
  (newValue) => {
    console.log(editor.value?.chain());
    const isSame = editor.value?.getHTML() === newValue;

    if (isSame) {
      return;
    }

    editor.value?.commands.setContent(newValue || "", false);
  }
);
</script>

<style lang="scss">
.ProseMirror {
  outline: 0 !important;
  margin: 16px !important;
  word-wrap: break-word;
  white-space: pre-wrap;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;

  ul,
  ol {
    padding-left: 24px;
  }
}
</style>
