---
'@vue-bridge/runtime': major
---

fix(attrsListenersMixin): refactored to normal object, exposes class and style as methods now
fix(types): properly expose all types, annotate customDirective types
feat(build): provide `iife` build for CDN usage
fix(lifecyleMixin): skip lifecycle checks in Vue3 build as they are unnecessary