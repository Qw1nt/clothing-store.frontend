import{_ as b}from"./page-header.vue.529b007a.js";import{a as N,r as n,H as y,k as A,l as D,u as a,h as U,m as s,w as u,p as E,o as j,q as o,s as g,t as G,v as c,x as H,E as L,y as S,z as $,A as q}from"./entry.be01013c.js";import{G as z}from"./grid.35dcc269.js";/* empty css                  *//* empty css                    *//* empty css                 *//* empty css                     *//* empty css                  */import{U as F}from"./user-request-group.21db651d.js";import{c as M}from"./local-firewall.102d6951.js";const O={key:0},T={class:"flex justify-center"},J={class:"w-1/4"},K={class:"w-full flex justify-center"},Q={key:0},W=["src"],X=["src"],Y=o("div",{class:"text-right text-xs"}," jpg/png файлы ",-1),Z={class:"flex justify-center"},ee={class:"w-3/4"},te={class:"flex mt-3"},le={class:"flex justify-end"},_e=N({__name:"index",setup(oe){const V=n(!1),k=new y("product",A()),w=n([]),i=n(null),h=n(""),d=n(""),r=n([]),p=n(""),m=n(""),_=n("");function C(l){i.value=l.raw,h.value=URL.createObjectURL(i.value)}async function B(){const l=new FormData;r.value.forEach(e=>{l.append("categoriesIds",e)}),l.append("name",d.value),l.append("description",p.value),l.append("price",m.value),l.append("color",_.value),l.append("image",i.value),await k.post("",l,()=>{H().push("/admin-panel")})}return D(async()=>{await M(F.Admin,()=>{}),await new y("category").get("",e=>{e.forEach(f=>{w.value.push({value:f.id,label:f.name})})}),V.value=!0}),(l,e)=>{const f=b,x=L,I=S,v=$,P=q,R=z;return a(V)?(j(),U("div",O,[s(f,{header:"Добавление товара"}),s(R,{class:"p-5"},{default:u(()=>[o("div",T,[o("div",J,[o("div",K,[a(i)!=null&&a(h).length>0?(j(),U("div",Q,[o("img",{src:a(h)},null,8,W)])):E("",!0)]),s(I,{class:"flex flex-col jusitfy-center mt-5",action:"#","auto-upload":!1,"show-file-list":!1,"on-change":C},{file:u(({file:t})=>[o("div",null,[g(G(t)+" ",1),o("img",{class:"el-upload-list__item-thumbnail",src:t,alt:""},null,8,X)])]),tip:u(()=>[Y]),default:u(()=>[s(x,{class:"w-full",type:"primary"},{default:u(()=>[g("Изменить изображение")]),_:1})]),_:1})])]),o("div",Z,[o("div",ee,[s(v,{modelValue:a(d),"onUpdate:modelValue":e[0]||(e[0]=t=>c(d)?d.value=t:null),class:"mt-5",placeholder:"Название"},null,8,["modelValue"]),s(P,{class:"mt-3 w-full",modelValue:a(r),"onUpdate:modelValue":e[1]||(e[1]=t=>c(r)?r.value=t:null),options:a(w),placeholder:"Категории",multiple:"","collapse-tags":"","collapse-tags-tooltip":""},null,8,["modelValue","options"]),s(v,{type:"textarea",modelValue:a(p),"onUpdate:modelValue":e[2]||(e[2]=t=>c(p)?p.value=t:null),class:"mt-3",placeholder:"Описание"},null,8,["modelValue"]),o("div",te,[s(v,{modelValue:a(_),"onUpdate:modelValue":e[3]||(e[3]=t=>c(_)?_.value=t:null),class:"mr-10",placeholder:"Цвет"},null,8,["modelValue"]),s(v,{modelValue:a(m),"onUpdate:modelValue":e[4]||(e[4]=t=>c(m)?m.value=t:null),placeholder:"Цена"},null,8,["modelValue"])])])]),o("div",le,[s(x,{onClick:e[5]||(e[5]=t=>B()),class:"mr-40 mt-5"},{default:u(()=>[g("Добавить")]),_:1})])]),_:1})])):E("",!0)}}});export{_e as default};
