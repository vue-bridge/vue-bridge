# `@vue-bridge/testing`

A thin wrapper around `@vue/test-utils`.

It re-exports all APIs of that package, but replaces `mount` and `shallowMount` with wrapper functions that ensure cross-compatility between the two different APIs of `@vue/test-utils` for Vue 2 and Vue 3, respectively.