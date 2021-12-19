<template>
  <div v-if="editor" class="content-editor">
    <div class="actions">
      <v-btn
        @click="editor.chain().focus().setFontFamily('Inter').run()"
        :class="{
          'is-active': editor.isActive('textStyle', { fontFamily: 'Inter' }),
        }"
      >
        Inter
      </v-btn>
      <v-btn
        @click="
          editor
            .chain()
            .focus()
            .setFontFamily('Comic Sans MS, Comic Sans')
            .run()
        "
        :class="{
          'is-active': editor.isActive('textStyle', {
            fontFamily: 'Comic Sans MS, Comic Sans',
          }),
        }"
      >
        Comic Sans
      </v-btn>
      <v-btn
        @click="editor.chain().focus().setFontFamily('serif').run()"
        :class="{
          'is-active': editor.isActive('textStyle', { fontFamily: 'serif' }),
        }"
      >
        serif
      </v-btn>
      <v-btn
        @click="editor.chain().focus().setFontFamily('monospace').run()"
        :class="{
          'is-active': editor.isActive('textStyle', {
            fontFamily: 'monospace',
          }),
        }"
      >
        monospace
      </v-btn>
      <v-btn
        @click="editor.chain().focus().setFontFamily('cursive').run()"
        :class="{
          'is-active': editor.isActive('textStyle', { fontFamily: 'cursive' }),
        }"
      >
        cursive
      </v-btn>
      <v-btn @click="editor.chain().focus().unsetFontFamily().run()">
        Remove font-family
      </v-btn>
      <v-btn
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{
          'is-active': editor.isActive('textStyle', {
            fontFamily: 'monospace',
          }),
        }"
      >
        list
      </v-btn>
    </div>

    <editor-content :editor="editor" class="content-editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";

export default {
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      editor: null,
      extensions: [
        Document,
        Paragraph,
        Text,
        TextStyle,
        FontFamily,
        BulletList,
        ListItem,
      ],
    };
  },

  watch: {
    value(value) {
      const isSame = this.editor.getHTML() === value;
      if (isSame) {
        return;
      }

      this.editor.commands.setContent(this.value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: this.extensions,
      content: this.value,
      onUpdate: () => {
        this.$emit("input", this.editor.getHTML());
      },
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
<style lang="scss" scoped>
.actions {
  margin-bottom: 16px;
}
::v-deep .ProseMirror {
  border: thin solid hsla(0, 0%, 100%, 0.12);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  border-radius: 4px;
  padding: 8px;
  color: var(--v-accent-lighten5);
  &:hover {
    border: thin solid var(--v-accent-lighten5);
  }

  &:focus {
    border: thin solid var(--v-primary-base) !important;
  }
}
.content-editor {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
