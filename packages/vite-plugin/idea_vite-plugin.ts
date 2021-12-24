/**
 * This could be a 'pre' plugin that removes style blocks from .vue files
 * when they have a v2/v3 attribute that doesn't match the current build's target version.
 *
 * That way, we can have different styles for Vue 2 and Vue 3, which is important for handling
 * ::v-deep vs :slotted() special pseudo-selectors
 */

const sfc = `
<template>
  <h1>xxx</h1>
</template>

<style scoped>

</style>

<style v3 scoped>
  .red {
    color: red;
  }
</style>

<style lang="scss" scoped v2>
  .red {
    color: red;
  }
</style>

<style v2>
  .red {
    color: red;
  }
</style>
`
const styleRE =
  /<style (?:.*?)?(v(?:2|3))(?:.*?)?>(?:(?:\n|\r|.)*?)<\/style>\n?/gm

const results = [...sfc.matchAll(styleRE)]

console.log([...results[0][0].matchAll(/\n/gm)].length)

console.log(sfc.replace(results[0][0], '\n'.repeat(5)))
// console.log(results)
