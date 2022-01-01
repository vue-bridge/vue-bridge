# Comparisons

## `@vue/compostion-api`

## `vue-demi`

## `@vue/compat`

The "Migration build" of Vue 3, aka `@vue/compat`, is meant to support the _transition_ from Vue 2 to Vue 3. It should be used *temporarily* while migrating a big app from Vue 2 to Vue 3. After you are done migrating to Vue 3, you remove `@vue/compat` from your setup and run on Vue 3 only. It also will be phased out from publishing around the end of 2021.

In comparison `@vue-bridge/runtime` is intended to be a long-term solution for *libraries* that want to build and publish packages that can be consumed by both Vue 2 and Vue 3 projects. As such, it has some limitations that authors need to be aware of and respect while writing their libraries, which is what the guide of this project provides.