import{a as j,k as w,r as m,l as q,u as n,h as _,m as a,w as i,v as N,q as t,B as g,C as y,t as x,p as h,x as k,H as b,D as z,F as A,E as G,y as H,o as f,G as L,s as u,z as M}from"./entry.be01013c.js";import{_ as T}from"./page-header.vue.529b007a.js";/* empty css                 *//* empty css                   *//* empty css                  *//* empty css                    */import{c as F}from"./local-firewall.102d6951.js";import{U as O}from"./user-request-group.21db651d.js";import{P}from"./product-request-group.c1fcd81e.js";const S={key:0},J={class:"grid grid-cols-5 gap-x-5"},K=t("div",null,null,-1),Q=["src"],W={key:1},X=["src"],Y=["src"],Z={class:"col-span-2 flex flex-col justify-end"},ee={class:"flex mt-1"},te=t("p",{class:"text-lg font-medium mr-2"},"Цвет: ",-1),le={class:"flex mt-1"},se=t("p",{class:"text-lg font-medium mr-2"},"Цена(₽): ",-1),oe={class:"mt-5"},ne=t("p",{class:"text-lg font-medium"},"Описание: ",-1),ae={key:0,class:"w-full text-lg"},ie=t("div",{class:"mt-auto"},null,-1),ue={class:"flex justify-end"},de=t("div",{class:"grid grid-cols-4"},[t("div")],-1),we=j({__name:"[id]",setup(ce){const v=new P(w()),l=m(),d=m(null),c=m(""),p=m(!1);function U(s){d.value=s.raw,c.value=URL.createObjectURL(d.value)}function V(){d.value=null,c.value=null}async function C(){await k().push("/admin-panel")}async function R(){var e;await new b("product",w()).delete(`${(e=l.value)==null?void 0:e.id}`,async()=>{await k().push("/admin-panel")})}async function I(){const s=l.value,e={name:s.name,price:s==null?void 0:s.price,description:s==null?void 0:s.description,color:s==null?void 0:s.color,categories:s==null?void 0:s.categories};await v.update(l.value.id,e),d.value!=null&&await v.updateImage(l.value.id,d.value),d.value=null,c.value=null}return q(async()=>{await F(O.Admin,async()=>{await v.getProduct(z().params.id,s=>l.value=s)})}),(s,e)=>{const B=M,D=A,E=T,r=G,$=H;return n(l)!=null?(f(),_("div",S,[a(D,{modelValue:n(p),"onUpdate:modelValue":e[1]||(e[1]=o=>N(p)?p.value=o:null),title:"Описание товара"},{default:i(()=>[a(B,{modelValue:n(l).description,"onUpdate:modelValue":e[0]||(e[0]=o=>n(l).description=o),type:"textarea"},null,8,["modelValue"])]),_:1},8,["modelValue"]),a(E,{header:"Редактирование товара"}),t("div",J,[K,t("div",null,[n(c)==null||n(c).length==0?(f(),_("img",{key:0,src:n(L)(n(l).imageUrl)},null,8,Q)):(f(),_("div",W,[t("img",{src:n(c)},null,8,X),a(r,{onClick:V},{default:i(()=>[u("Сбросить")]),_:1})])),a($,{class:"flex flex-col jusitfy-center mt-5",action:"#","auto-upload":!1,"show-file-list":!1,"on-change":U},{file:i(({file:o})=>[t("div",null,[u(x(o)+" ",1),t("img",{class:"el-upload-list__item-thumbnail",src:o,alt:""},null,8,Y)])]),tip:i(()=>[]),default:i(()=>[a(r,{class:"w-full",type:"primary"},{default:i(()=>[u("Изменить изображение")]),_:1})]),_:1})]),t("div",Z,[g(t("input",{class:"hover:outline outline-1 outline-sky-500 w-full text-xl","onUpdate:modelValue":e[2]||(e[2]=o=>n(l).name=o)},null,512),[[y,n(l).name]]),t("div",ee,[te,g(t("input",{class:"hover:outline outline-1 outline-sky-500 w-full text-lg","onUpdate:modelValue":e[3]||(e[3]=o=>n(l).color=o)},null,512),[[y,n(l).color]])]),t("div",le,[se,g(t("input",{class:"hover:outline outline-1 outline-sky-500 w-full text-lg","onUpdate:modelValue":e[4]||(e[4]=o=>n(l).price=o)},null,512),[[y,n(l).price]])]),t("div",oe,[ne,n(l).description!=null&&n(l).description.length>0?(f(),_("p",ae,x(n(l).description),1)):h("",!0),a(r,{onClick:e[5]||(e[5]=o=>p.value=!0),class:"mt-1 w-full",size:"small"},{default:i(()=>{var o;return[u(x(((o=n(l).description)==null?void 0:o.length)>0?"Редактировать":"Добавить"),1)]}),_:1})]),ie,t("div",ue,[a(r,{onClick:e[6]||(e[6]=o=>R()),type:"danger",class:"mr-auto"},{default:i(()=>[u("Удалить")]),_:1}),a(r,{onClick:e[7]||(e[7]=o=>C())},{default:i(()=>[u("Отмена")]),_:1}),a(r,{onClick:e[8]||(e[8]=o=>I()),type:"primary"},{default:i(()=>[u("Сохранить изменения")]),_:1}),de])])])])):h("",!0)}}});export{we as default};
