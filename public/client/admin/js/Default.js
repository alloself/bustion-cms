import{p as i,m as p,a as f,g as d,u as v,b as V,c as y,d as s,e as r,r as b,o as c,f as u,w as _,V as g}from"./index.js";const k=i({scrollable:Boolean,...p(),...f({tag:"main"})},"VMain"),w=d()({name:"VMain",props:k(),setup(a,t){let{slots:e}=t;const{mainStyles:n}=v(),{ssrBootStyles:m}=V();return y(()=>s(a.tag,{class:["v-main",{"v-main--scrollable":a.scrollable},a.class],style:[n.value,m.value,a.style]},{default:()=>{var o,l;return[a.scrollable?s("div",{class:"v-main__scroller"},[(o=e.default)==null?void 0:o.call(e)]):(l=e.default)==null?void 0:l.call(e)]}})),{}}}),B=r({__name:"View",setup(a){return(t,e)=>{const n=b("router-view");return c(),u(w,null,{default:_(()=>[s(n)]),_:1})}}}),x=r({__name:"Default",setup(a){return(t,e)=>(c(),u(g,null,{default:_(()=>[s(B)]),_:1}))}});export{x as default};