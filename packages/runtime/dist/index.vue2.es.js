var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
/**
 *  Copyright 2022 Thorsten Luenborg 
 *  @license MIT
**/
import { defineComponent as defineComponent$1 } from "vue";
const isVue2 = true;
const attrsListenersMixinVue2 = {
  methods: {
    $_attrs() {
      return this.$attrs;
    },
    $_listeners() {
      return this.$listeners;
    },
    $_class() {
      return "";
    },
    $_style() {
      return "";
    },
    $_nativeOn() {
      return {};
    }
  }
};
const attrsListenersMixin = attrsListenersMixinVue2;
const map = {
  beforeMount: "bind",
  beforeCreate: null,
  mounted: "inserted",
  beforeUpdate: null,
  update: null,
  updated: "componentUpdated",
  beforeUnMount: null,
  unmounted: "unbind"
};
function defineDirective(directiveConfig) {
  {
    const newDirective = {};
    Object.keys(directiveConfig).forEach((hook) => {
      const newName = map[hook];
      if (newName) {
        newDirective[newName] = wrapDirectiveHook(directiveConfig[hook]);
      }
    });
    return newDirective;
  }
}
function wrapDirectiveHook(hookFn) {
  return (el, binding, newVNode, oldVNode) => {
    const instance = newVNode.context;
    binding.instance = instance;
    return hookFn(el, binding, newVNode, oldVNode);
  };
}
function patchVModelProp(component) {
  if (hasVModelProp(component.props) && hasvModelEvent(component.emits)) {
    checkModelOptions(component.model);
    component.model = {
      prop: "modelValue",
      event: "update:modelValue"
    };
  }
}
function hasvModelEvent(emits = []) {
  const events = Array.isArray(emits) ? emits : Object.keys(emits);
  return events.includes("update:modelValue");
}
function hasVModelProp(props = {}) {
  return Object.prototype.hasOwnProperty.call(props, "modelValue");
}
function checkModelOptions(model) {
  if (!model)
    return;
  if (model.prop !== "modelValue" || model.event !== "update:modelValue") {
    throw new Error("[@vue-bridge/runtime]: don't use the `model` option on components. this plugin needs to override it to ensure v-model cross-compat");
  }
}
const patchLifecycleHooks = (options) => {
  {
    if (options.beforeUnmount) {
      options.beforeDestroy = options.beforeUnmount;
      delete options.beforeUnmount;
    }
    if (options.unmounted) {
      options.destroyed = options.unmounted;
      delete options.unmounted;
    }
  }
};
const slotsMixin = {
  beforeCreate() {
    {
      Object.defineProperty(this, "$bridgeSlots", {
        get() {
          const slots = {};
          Object.keys(this.$slots).forEach((key) => {
            slots[key] = () => this.$slots[key];
          });
          return __spreadValues(__spreadValues({}, slots), this.$scopedSlots);
        }
      });
    }
  }
};
const defineComponent = (component) => {
  if (typeof component === "function") {
    component = {
      setup: component,
      name: component.name
    };
  }
  component.mixins = component.mixins || [];
  component.mixins.push(slotsMixin);
  {
    patchVModelProp(component);
    patchLifecycleHooks(component);
  }
  return defineComponent$1(component);
};
export { attrsListenersMixin, defineComponent, defineDirective, isVue2 };
