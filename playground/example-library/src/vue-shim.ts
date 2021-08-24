declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $_attrs: Record<string, string | number | boolean>
    $_listeners: Record<string, () => void>
  }
}

export {}
