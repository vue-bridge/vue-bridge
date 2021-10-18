# Workflow of publishing cross-compatible Vue Libraries

> _**This needs a big overhaul and extension**_

The changes introduced in Vue 3 can be roughly put in 3 categories:

1. **Fundamentally incompatible** - When writing cross-compatible components, you simply have to avoid these.
2. **Incompatible, but can be polyfilled safely at runtime** - this is what the `@vue-bridge/runtime` package does.
3. **behavioral differences in specific scenarios** - these you can account for yourself in your code, by following a few basic rules.

This compatible code will have to be both _tested_ and _built_ twice - once for each version. 

Our guide will explain all of these to you and offer instructions on how to deal with them.