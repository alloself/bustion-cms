import{a as e}from"./index.esm.js";import{r as t}from"./vue-codemirror.js";import"./lodash.js";function m(o){return t([{component:"v-text-field",key:"name",props:{autocomplete:"name",label:"Название",name:"name",type:"text"},rule:e().required()},{component:"v-text-field",key:"key",props:{autocomplete:"key",label:"Ключ",name:"key",type:"text"},rule:e().required()}]).value}export{m as default};