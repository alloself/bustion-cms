import { type Component } from "vue";

export interface IFormField {
  component: Component | string;
  key: string | (() => string);
  props?: Record<string, unknown>;
  events?: Record<string, Function>;
  rule?: unknown;
}
