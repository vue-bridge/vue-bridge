/**
 *  Copyright 2022 Thorsten Luenborg 
 *  @license MIT
**/
import { defineComponent as defineComponent$1 } from "vue";
const isVue2 = false;
const listenerRE = /^on[A-Z]/;
const isOn = (v) => !!v.match(listenerRE);
const CACHE = "__vb_alCache";
const attrsListenersMixinVue3 = {
  beforeCreate() {
    this[CACHE] = generateData(this);
  },
  beforeUpdate() {
    this[CACHE] = generateData(this);
  },
  methods: {
    $_attrs() {
      return this[CACHE].attrs;
    },
    $_listeners() {
      return this[CACHE].listeners;
    },
    $_nativeOn() {
      return this[CACHE].nativeOn;
    },
    $_class() {
      return this.$attrs.class;
    },
    $_style() {
      return this.$attrs.style;
    }
  }
};
function generateData(vm) {
  const $attrs = vm.$attrs;
  const emits = Object.keys(vm._.emitsOptions || {});
  const rawProps = vm._.vnode.props;
  const attrs = {};
  const listeners = {};
  const nativeOn = {};
  for (const key in $attrs) {
    if (isOn(key)) {
      nativeOn[key] = $attrs[key];
    } else if (key !== "class" && key !== "style") {
      attrs[key] = $attrs[key];
    }
  }
  emits.forEach((_key) => {
    const key = "on" + _key[0].toUpperCase() + _key.slice(1);
    if (rawProps[key]) {
      listeners[key] = rawProps[key];
    }
  });
  return {
    attrs,
    listeners,
    nativeOn
  };
}
const attrsListenersMixin = attrsListenersMixinVue3;
function defineDirective(directiveConfig) {
  {
    return directiveConfig;
  }
}
const setDeleteMixin = {
  beforeCreate() {
    this.$set = (obj, key, value) => {
      obj[key] = value;
    };
    this.$delete = (obj, key) => {
      if (Array.isArray(obj)) {
        obj.splice(+key, 1);
      } else {
        delete obj[key];
      }
    };
  }
};
const slotsMixin = {
  beforeCreate() {
    {
      Object.defineProperty(this, "$bridgeSlots", {
        get() {
          return this.$slots;
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
    component.mixins.push(setDeleteMixin);
  }
  return defineComponent$1(component);
};
export { attrsListenersMixin, defineComponent, defineDirective, isVue2 };
