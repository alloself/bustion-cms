import{p as ye,a7 as ke,a8 as we,t as Se,a9 as Ce,aa as xe,g as be,f as Fe,x as H,ab as Ae,ac as Ie,ad as Pe,ae as De,af as Re,ag as _e,h as Me,V as G,X as Te,a5 as Le,a2 as J,ah as Be,a3 as Ee,ai as Ke,o as Q,aj as Ne,ak as Oe,al as Ue,am as He,B as je,an as Y,w as ze}from"./index.js";import{r as M,s as A,j as V,w as T,n as Z,H as o,F as L,K as b,$ as $e}from"./vue-codemirror.js";function qe(e,y,u){if(y==null)return e;if(Array.isArray(y))throw new Error("Multiple matches is not implemented");return typeof y=="number"&&~y?o(L,null,[o("span",{class:"v-autocomplete__unmask"},[e.substr(0,y)]),o("span",{class:"v-autocomplete__mask"},[e.substr(y,u)]),o("span",{class:"v-autocomplete__unmask"},[e.substr(y+u)])]):e}const We=ye({autoSelectFirst:{type:[Boolean,String]},clearOnSelect:Boolean,search:String,...ke({filterKeys:["title"]}),...we(),...Se(Ce({modelValue:null,role:"combobox"}),["validationValue","dirty","appendInnerIcon"]),...xe({transition:!1})},"VAutocomplete"),Je=be()({name:"VAutocomplete",props:We(),emits:{"update:focused":e=>!0,"update:search":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,y){let{slots:u}=y;const{t:B}=Fe(),h=M(),k=A(!1),w=A(!0),I=A(!1),j=M(),z=M(),E=H(e,"menu"),c=V({get:()=>E.value,set:l=>{var a;E.value&&!l&&((a=j.value)!=null&&a.ΨopenChildren)||(E.value=l)}}),r=A(-1),ee=V(()=>{var l;return(l=h.value)==null?void 0:l.color}),$=V(()=>c.value?e.closeText:e.openText),{items:q,transformIn:le,transformOut:ae}=Ae(e),{textColorClasses:te,textColorStyles:ue}=Ie(ee),v=H(e,"search",""),n=H(e,"modelValue",[],l=>le(l===null?[null]:ze(l)),l=>{const a=ae(l);return e.multiple?a:a[0]??null}),ne=V(()=>typeof e.counterValue=="function"?e.counterValue(n.value):typeof e.counterValue=="number"?e.counterValue:n.value.length),x=Pe(),{filteredItems:K,getMatches:oe}=De(e,q,()=>w.value?"":v.value),g=V(()=>e.hideSelected?K.value.filter(l=>!n.value.some(a=>a.value===l.value)):K.value),P=V(()=>!!(e.chips||u.chip)),F=V(()=>P.value||!!u.selection),se=V(()=>n.value.map(l=>l.props.value)),D=V(()=>{var a;return(e.autoSelectFirst===!0||e.autoSelectFirst==="exact"&&v.value===((a=g.value[0])==null?void 0:a.title))&&g.value.length>0&&!w.value&&!I.value}),N=V(()=>e.hideNoData&&!g.value.length||e.readonly||(x==null?void 0:x.isReadonly.value)),O=M(),{onListScroll:ie,onListKeydown:re}=Re(O,h);function ce(l){e.openOnClear&&(c.value=!0),v.value=""}function ve(){N.value||(c.value=!0)}function de(l){N.value||(k.value&&(l.preventDefault(),l.stopPropagation()),c.value=!c.value)}function fe(l){var t,s,m;if(e.readonly||x!=null&&x.isReadonly.value)return;const a=h.value.selectionStart,i=n.value.length;if((r.value>-1||["Enter","ArrowDown","ArrowUp"].includes(l.key))&&l.preventDefault(),["Enter","ArrowDown"].includes(l.key)&&(c.value=!0),["Escape"].includes(l.key)&&(c.value=!1),D.value&&["Enter","Tab"].includes(l.key)&&S(g.value[0]),l.key==="ArrowDown"&&D.value&&((t=O.value)==null||t.focus("next")),["Backspace","Delete"].includes(l.key)){if(!e.multiple&&F.value&&n.value.length>0&&!v.value)return S(n.value[0],!1);if(~r.value){const d=r.value;S(n.value[r.value],!1),r.value=d>=i-1?i-2:d}else l.key==="Backspace"&&!v.value&&(r.value=i-1)}if(e.multiple){if(l.key==="ArrowLeft"){if(r.value<0&&a>0)return;const d=r.value>-1?r.value-1:i-1;n.value[d]?r.value=d:(r.value=-1,h.value.setSelectionRange((s=v.value)==null?void 0:s.length,(m=v.value)==null?void 0:m.length))}if(l.key==="ArrowRight"){if(r.value<0)return;const d=r.value+1;n.value[d]?r.value=d:(r.value=-1,h.value.setSelectionRange(0,0))}}}function me(l){if(Y(h.value,":autofill")||Y(h.value,":-webkit-autofill")){const a=q.value.find(i=>i.title===l.target.value);a&&S(a)}}function pe(){var l;k.value&&(w.value=!0,(l=h.value)==null||l.focus())}function he(l){k.value=!0,setTimeout(()=>{I.value=!0})}function ge(l){I.value=!1}function Ve(l){(l==null||l===""&&!e.multiple&&!F.value)&&(n.value=[])}const U=A(!1);function S(l){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;if(!(!l||l.props.disabled))if(e.multiple){const i=n.value.findIndex(s=>e.valueComparator(s.value,l.value)),t=a??!~i;if(~i){const s=t?[...n.value,l]:[...n.value];s.splice(i,1),n.value=s}else t&&(n.value=[...n.value,l]);e.clearOnSelect&&(v.value="")}else{const i=a!==!1;n.value=i?[l]:[],v.value=i&&!F.value?l.title:"",Z(()=>{c.value=!1,w.value=!0})}}return T(k,(l,a)=>{var i;l!==a&&(l?(U.value=!0,v.value=e.multiple||F.value?"":String(((i=n.value.at(-1))==null?void 0:i.props.title)??""),w.value=!0,Z(()=>U.value=!1)):(!e.multiple&&v.value==null?n.value=[]:D.value&&!I.value&&!n.value.some(t=>{let{value:s}=t;return s===g.value[0].value})&&S(g.value[0]),c.value=!1,v.value="",r.value=-1))}),T(v,l=>{!k.value||U.value||(l&&(c.value=!0),w.value=!l)}),T(c,()=>{if(!e.hideSelected&&c.value&&n.value.length){const l=g.value.findIndex(a=>n.value.some(i=>a.value===i.value));_e&&window.requestAnimationFrame(()=>{var a;l>=0&&((a=z.value)==null||a.scrollToIndex(l))})}}),T(()=>e.items,(l,a)=>{c.value||k.value&&!a.length&&l.length&&(c.value=!0)}),Me(()=>{const l=!!(!e.hideNoData||g.value.length||u["prepend-item"]||u["append-item"]||u["no-data"]),a=n.value.length>0,i=G.filterProps(e);return o(G,b({ref:h},i,{modelValue:v.value,"onUpdate:modelValue":[t=>v.value=t,Ve],focused:k.value,"onUpdate:focused":t=>k.value=t,validationValue:n.externalValue,counterValue:ne.value,dirty:a,onChange:me,class:["v-autocomplete",`v-autocomplete--${e.multiple?"multiple":"single"}`,{"v-autocomplete--active-menu":c.value,"v-autocomplete--chips":!!e.chips,"v-autocomplete--selection-slot":!!F.value,"v-autocomplete--selecting-index":r.value>-1},e.class],style:e.style,readonly:e.readonly,placeholder:a?void 0:e.placeholder,"onClick:clear":ce,"onMousedown:control":ve,onKeydown:fe}),{...u,default:()=>o(L,null,[o(Te,b({ref:j,modelValue:c.value,"onUpdate:modelValue":t=>c.value=t,activator:"parent",contentClass:"v-autocomplete__content",disabled:N.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:pe},e.menuProps),{default:()=>[l&&o(Le,b({ref:O,selected:se.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:t=>t.preventDefault(),onKeydown:re,onFocusin:he,onFocusout:ge,onScrollPassive:ie,tabindex:"-1","aria-live":"polite",color:e.itemColor??e.color},e.listProps),{default:()=>{var t,s,m;return[(t=u["prepend-item"])==null?void 0:t.call(u),!g.value.length&&!e.hideNoData&&(((s=u["no-data"])==null?void 0:s.call(u))??o(J,{title:B(e.noDataText)},null)),o(Be,{ref:z,renderless:!0,items:g.value},{default:d=>{var X;let{item:f,index:C,itemRef:p}=d;const W=b(f.props,{ref:p,key:C,active:D.value&&C===0?!0:void 0,onClick:()=>S(f,null)});return((X=u.item)==null?void 0:X.call(u,{item:f,index:C,props:W}))??o(J,b(W,{role:"option"}),{prepend:R=>{let{isSelected:_}=R;return o(L,null,[e.multiple&&!e.hideSelected?o(Ee,{key:f.value,modelValue:_,ripple:!1,tabindex:"-1"},null):void 0,f.props.prependAvatar&&o(Ke,{image:f.props.prependAvatar},null),f.props.prependIcon&&o(Q,{icon:f.props.prependIcon},null)])},title:()=>{var R,_;return w.value?f.title:qe(f.title,(R=oe(f))==null?void 0:R.title,((_=v.value)==null?void 0:_.length)??0)}})}}),(m=u["append-item"])==null?void 0:m.call(u)]}})]}),n.value.map((t,s)=>{function m(p){p.stopPropagation(),p.preventDefault(),S(t,!1)}const d={"onClick:close":m,onKeydown(p){p.key!=="Enter"&&p.key!==" "||(p.preventDefault(),p.stopPropagation(),m(p))},onMousedown(p){p.preventDefault(),p.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0},f=P.value?!!u.chip:!!u.selection,C=f?Ne(P.value?u.chip({item:t,index:s,props:d}):u.selection({item:t,index:s})):void 0;if(!(f&&!C))return o("div",{key:t.value,class:["v-autocomplete__selection",s===r.value&&["v-autocomplete__selection--selected",te.value]],style:s===r.value?ue.value:{}},[P.value?u.chip?o(Ue,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:t.title}}},{default:()=>[C]}):o(Oe,b({key:"chip",closable:e.closableChips,size:"small",text:t.title,disabled:t.props.disabled},d),null):C??o("span",{class:"v-autocomplete__selection-text"},[t.title,e.multiple&&s<n.value.length-1&&o("span",{class:"v-autocomplete__selection-comma"},[$e(",")])])])})]),"append-inner":function(){var d;for(var t=arguments.length,s=new Array(t),m=0;m<t;m++)s[m]=arguments[m];return o(L,null,[(d=u["append-inner"])==null?void 0:d.call(u,...s),e.menuIcon?o(Q,{class:"v-autocomplete__menu-icon",icon:e.menuIcon,onMousedown:de,onClick:He,"aria-label":B($.value),title:B($.value)},null):void 0])}})}),je({isFocused:k,isPristine:w,menu:c,search:v,filteredItems:K,select:S},h)}});export{Je as V};
