"use strict";/**
 *  Copyright 2022 Thorsten Luenborg 
 *  @license MIT
**/Object.defineProperty(exports,"__esModule",{value:!0});exports[Symbol.toStringTag]="Module";var u=require("@vue/composition-api");const l=!0,d={computed:{$_attrs(){return this.$attrs},$_listeners(){return this.$listeners}},methods:{$_class(){return""},$_style(){return""}}},a=d,i={beforeCreate(){{const e=this.$options;e.beforeUnmount&&(e.beforeDestroy=e.beforeUnmount,delete e.beforeUnmount),e.unmounted&&(e.destroyed=e.unmounted,delete e.unmounted)}}},c={beforeCreate(){this.$set=(e,t,n)=>{e[t]=n},this.$delete=(e,t)=>{Array.isArray(e)?e.splice(+t,1):delete e[t]}}},f={beforeMount:"bind",beforeCreate:null,mounted:"inserted",beforeUpdate:null,update:null,updated:"componentUpdated",beforeUnMount:null,unmounted:"unbind"};function p(e){{const t={};return Object.keys(e).forEach(n=>{const r=f[n];r&&(t[r]=m(e[n]))}),t}}function m(e){return(t,n,r,s)=>{const o=r.context;return n.instance=o,e(t,n,r,s)}}function h(e){y(e.props)&&b(e.emits)&&(M(e.model),e.model={prop:"modelValue",event:"update:modelValue"})}function b(e=[]){return(Array.isArray(e)?e:Object.keys(e)).includes("update:modelValue")}function y(e={}){return Object.prototype.hasOwnProperty.call(e,"modelValue")}function M(e){if(!!e&&(e.prop!=="modelValue"||e.event!=="update:modelValue"))throw new Error("[@vue-bridge/runtime]: don't use the `model` option on components. this plugin needs to override it to ensure v-model cross-compat")}const v={beforeCreate(){Object.defineProperty(this,"$allSlots",{get(){return this.$scopedSlots}})}},x=e=>(typeof e=="function"&&(e={setup:e,name:e.name}),e.mixins=e.mixins||[],e.mixins.push(v),h(e),e.mixins.push(i),u.defineComponent(e));exports.attrsListenersMixin=a;exports.defineComponent=x;exports.defineDirective=p;exports.isVue2=l;exports.lifecycleMixin=i;exports.setDeleteMixin=c;
