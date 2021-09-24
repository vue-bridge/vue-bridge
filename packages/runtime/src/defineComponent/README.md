These files are added as imports during build by a small plugin.

Reason: We don't actually want to have vue-demi as a dependency at runtime as it will install the composition-api plugin and thus this whole plugin will be included.

But we only need the small `defineComponent` function, not the whole fat plugin. So we use this trick here to have the Vue3 import set to `from 'vue'` and the vue2 import to `from '@vue/composition-api'`.

We can treeshake the unneeded parts from the VCA plugin, which we could not if we used vue-demi at runtime.

Note: during tests we can still use vue-demi as its re-exports are the same as we export from these two files here during build.