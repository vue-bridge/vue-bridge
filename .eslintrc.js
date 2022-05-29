module.exports = {
  root: true,
  extends: ['@linusborg'],
  ignorePatterns: ['!docs/.vitepress'],
  overrides: [
    {
      files: ['*.js'],
      env: {
        node: true,
      },
    },
  ],
}
