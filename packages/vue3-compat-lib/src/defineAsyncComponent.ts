import { isVue2 } from './constants'
import { defineAsyncComponent as _defineAsyncComponent } from 'vue'
import type { AsyncComponentLoader, AsyncComponentOptions } from 'vue'

export function defineAsyncComponent<T>(
  compFn: AsyncComponentLoader<T> | AsyncComponentOptions<T>
) {
  if (isVue2) {
    // TODO: check for API incompats
    return compFn
  } else {
    return _defineAsyncComponent(compFn)
  }
}
