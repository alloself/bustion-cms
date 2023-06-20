<template>
  <v-sheet variant="outlined" :border="2" rounded>
    <v-toolbar density="compact" dark>
      <v-btn-group v-if="editor" multiple class="flex">
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
    <editor-content :editor="editor" />
  </v-sheet>
</template>

<script setup lang="ts">
import { useEditor, EditorContent, type Content } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { onBeforeMount, ref, watch } from "vue";

const props = defineProps<{ modelValue?: Content }>();
const emits = defineEmits(["update:model-value"]);

const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit],
  onUpdate: ({ editor }) => {
    emits("update:model-value", editor.getHTML());
  },
});

const actions = ref({
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
  /*
  undo,
  redo,*/
});

onBeforeMount(() => {
  editor.value?.destroy();
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
