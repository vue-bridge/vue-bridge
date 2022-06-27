export const set = (
  obj: { [k: string]: any },
  key: string | number,
  value: any
) => {
  obj[key] = value
}

export const del = (obj: { [k: string]: any }, key: string | number) => {
  if (Array.isArray(obj)) {
    obj.splice(+key, 1)
  } else {
    delete obj[key]
  }
}
