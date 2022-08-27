---
outline: deep
---

# Dependency Management


You want to to have a proper setup, which allows you to write, run, test and build your library reliably for Vue 2 and Vue 3. To do this, you will need a bunch of dependencies related testing and building:

|Dependency|Vue 2| Vue 3|Notes|
|----------|-----|------|-----|
|`vue`|`^2.6`|`^3`|Hoisting to root easily causes problems. PNPM's strictness helps here.|
|`@vue/test-utils`|`^1.0`|`^2.0`| Installing both versions with packages aliases is flaky. Workspaces are more reliable.
|`@vitejs/plugin-vue`|:x:|:white_check_mark:|
|`vite-plugin-vue2`|:white_check_mark:|:x:|
|`vue-template-compiler`|`^2.6`|:x:|Breaks if `vue` package is not a matching version|

While it is probably technically possible to install all of these into a project with one `package.json` using package alias names and such,this approach is complicated and brittle, in our experience. In a workspace setup, you can separate these dependencies into their own `package.json` files and keep them separate.
