import { isVue2 } from './constants'
// import { set, del } from 'v-bridge:set-delete'
import { set, del } from '~bridges/set-delete.ts'

export const setDeleteMixin = isVue2
  ? {}
  : {
      beforeCreate() {
        // @ts-expect-error
        this.$set = set
        // @ts-expect-error
        this.$delete = del
      },
    }
