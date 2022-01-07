import { isVue2 } from './constants'

export const setDeleteMixin = isVue2
  ? {}
  : {
      beforeCreate() {
        // @ts-expect-error
        this.$set = (
          obj: { [k: string]: any },
          key: string | number,
          value: any
        ) => {
          obj[key] = value
        }
        // @ts-expect-error
        this.$delete = (obj: { [k: string]: any }, key: string | number) => {
          if (Array.isArray(obj)) {
            obj.splice(+key, 1)
          } else {
            delete obj[key]
          }
        }
      },
    }
