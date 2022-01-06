/**
 *  Copyright 2022 Thorsten Luenborg 
 *  @license MIT
**/
import { defineComponent as defineComponent$1 } from "vue";
const isVue2 = false;
const listenerRE = /^on[A-Z]/;
const attrsListenersMixinVue3 = {
  methods: {
    $_attrs() {
      const attrs = this.$attrs;
      const _attrs = {};
      Object.keys(attrs).forEach((key) => {
        if (key !== "class" && key !== "style" && !listenerRE.test(key)) {
          _attrs[key] = attrs[key];
        }
      });
      return _attrs;
    },
    $_listeners() {
      const self = this;
      const emitsOptions = self._.emitsOptions;
      const attrs = self.$attrs;
      const listeners = {};
      Object.keys(attrs).forEach((key) => {
        if (listenerRE.test(key)) {
          const listener = lowerFirstChar(key.replace(/^on/, ""));
          if (!emitsOptions[listener]) {
            listeners[listener];
          }
        }
      });
      return listeners;
    },
    $_class() {
      return this.$attrs.class;
    },
    $_style() {
      return this.$attrs.style;
    }
  }
};
const attrsListenersMixin = attrsListenersMixinVue3;
function lowerFirstChar(v) {
  const first = v.slice(0, 1).toLowerCase();
  return first + v.slice(1);
}
const lifecycleMixin = {
  beforeCreate() {
  }
};
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
function defineDirective(directiveConfig) {
  {
    return directiveConfig;
  }
}
const slotsMixin = {
  beforeCreate() {
    {
      Object.defineProperty(this, "$allSlots", {
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
export { attrsListenersMixin, defineComponent, defineDirective, isVue2, lifecycleMixin, setDeleteMixin };
