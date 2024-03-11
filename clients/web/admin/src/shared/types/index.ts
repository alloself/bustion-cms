import { type Component, InjectionKey } from "vue";

export interface IFormField {
  component: Component | string;
  key: string | (() => string);
  props?: Record<string, unknown>;
  events?: Record<string, Function>;
  rule?: unknown;
}

export interface IModuleItem {
  id: string;
}

export interface IModuleDetailProps {
  id?: string | number;
  modal?: boolean;
  initialValues?: Record<string, unknown>;
  moduleKey: string;
}

export interface IModuleItem {
  id: string;
  order: number;
}

export interface IRelationWithKeyItem {
  id: string;
  order: number;
  pivot: {
    value: string;
  };
}

export interface ITreeItem {
  id: string;
  order: number;
  children?: ITreeItem[];
}

export interface IModuleListProps {
  moduleKey: string;
}

export interface IServerDataList {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface IModuleDetailAction {
  title: string;
  props: Record<string, unknown>;
  action: () => void;
  condition: ((args?: unknown) => boolean) | boolean;
}

export interface ISmartFormProps {
  fields: IFormField[];
  initialValues?: Record<string, unknown>;
  loading?: boolean;
}

export interface IOptionsFieldsFabric<T> {
  entity?: T;
  initialValues?: Record<keyof T, unknown>;
}

export interface IPage {
  id: string;
  title: string;
  subtitle: string | null;
  path: string | null;
  slug: string;
  meta: Record<string, string>;
  children: IPage[];
  index: boolean;
  show: boolean;
  template_id: string | null;
  language_id: string | null;
  header_id: string | null;
  footer_id: string | null;
  parent_id: string | null;
}

export interface IProduct {
  id: string;
  title: string;
  slug: string;
  description: string;
  nutritional: string;
  category_id: string;
  order: number;
  price: number;
  weight: number;
}

export interface IRelationAutocompleteProps {
  readonly?: boolean;
  moduleKey: string;
  modelValue?: string;
  loading?:boolean;
}

export interface IModal {
  component: Component;
  props: Record<string, unknown>;
  actions: Record<string, unknown>;
}

export interface IRelationsTableProps<T> {
  moduleKey: string;
  relationKey: keyof T;
  modelValue: T[];
  showActions?: boolean;
  initialValues?: Record<keyof T, unknown>;
  itemTitle?: string;
}

export interface IRelationsWithKeyTableProps<T> {
  moduleKey: string;
  modelValue: T[];
  showActions?: boolean;
  initialValues?: Record<keyof T, unknown>;
  itemTitle?: string;
}

export interface IGetFieldsOptions {
  entity?: Record<string, unknown>;
  initialValues?: Record<string, unknown>;
}

export interface IRelationTreeProps<T> {
  modelValue: T[];
  moduleKey: string;
  relationKey: keyof T;
  initialValues: Record<keyof T, unknown>;
  itemTitle?: string;
}

export interface IFooter {
  id: string;
}

export interface IHeader {
  id: string;
}

export interface ILanguage {
  id: string;
}

export interface IMenu {
  id: string;
}

export interface IBlock {
  id: string;
  page_id: string;
}

export interface IFile {
  id: string;
  path: string;
  pivot: {
    key: string;
    type: "image" | "file";
  };
}

export interface IMenuItem {
  id: string;
  menu_id: string | null;
}

export interface ITemplate {
  id: string;
}

export interface IRole {
  name: string;
}

export interface IUser {
  name: string;
  email: string;
  roles: IRole[];
}

export interface ITreeViewItemProps {
  item: ITreeItem;
  itemTitle?: keyof ITreeItem | ((item: ITreeItem) => string) | string;
}

export interface ITreeViewProps {
  items: ITreeItem[];
  itemTitle: string;
  modelValue: ITreeItem[];
}

export interface IFilesTableProps {
  modelValue?: IFile[];
  title?: string;
  icon?: string;
  type?: string;
}

export type IRelationTreeChangeOrderFunction = (
  item: Record<string, any>,
  order: number
) => Promise<void>;

export type IRelationTreeOnSelectFunction = (items: ITreeItem) => void;

export type IRelationTreeOnItemClickFunction = (
  e: Event,
  item: ITreeItem
) => void;

//TODO: проверить как сделать с дженериками
export const relationTreeChangeOrderFunction: InjectionKey<IRelationTreeChangeOrderFunction> =
  Symbol();

export const relationTreeOnSelectFunction: InjectionKey<IRelationTreeOnSelectFunction> =
  Symbol();

export const relationTreeOnItemClickFunction: InjectionKey<IRelationTreeOnItemClickFunction> =
  Symbol();
