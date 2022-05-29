module.exports = {
  root: true,
  extends: ['@linusborg'],
  ignorePatterns: ['!docs/src/.vitepress'],
  overrides: [
    {
      files: ['*.js'],
      env: {
        node: true,
      },
    },
  ],
}
