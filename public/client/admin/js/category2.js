import{a as o}from"./index.esm.js";import{_ as a}from"./RelationAutocomplete.vue_vue_type_script_setup_true_lang.js";import{_ as m}from"./RelationsTree.vue_vue_type_style_index_0_lang.js";import{_ as l}from"./RelationsTable.vue_vue_type_style_index_0_lang.js";import{r as p,m as r}from"./vue-codemirror.js";import"./lodash.js";import"./index.js";import"./ModuleDetail.js";import"./SmartForm.vue_vue_type_script_setup_true_lang.js";import"./VSpacer.js";import"./VAutocomplete.js";import"./VTooltip.js";import"./VRow.js";function b(e){var i;const t=p([{component:"v-text-field",key:"title",props:{autocomplete:"title",label:"Заголовок",name:"title",type:"text"},rule:o().required()},{component:"v-text-field",key:"order",props:{autocomplete:"order",label:"Приоритет",name:"order",type:"number"}},{component:r(a),key:"parent_id",props:{autocomplete:"parent_id",label:"Родительская категория",name:"parent_id",itemValue:"id",itemTitle:"title",moduleKey:"category"}}]);return(i=e==null?void 0:e.entity)!=null&&i.id&&(t.value.push({component:r(m),key:"children",props:{initialValues:{parent_id:e.entity.id},relationKey:"parent_id",moduleKey:"category",itemTitle:"title",showActions:!0}}),t.value.push({component:r(l),key:"products",props:{initialValues:{category_id:e.entity.id},relationKey:"category_id",moduleKey:"product",itemTitle:"title",showActions:!0}})),t.value}export{b as default};
