export function patchVModelProp(component: any) {
  if (hasVModelProp(component.props) && hasvModelEvent(component.emits)) {
    component.model = {
      prop: 'modelValue',
      event: 'update:modelValue'
    }
  }
}

function hasvModelEvent(emits: string[] | Record<string, any> = []): boolean {
  const events = Array.isArray(emits) ? emits : Object.keys(emits)
  return events.includes('update:modelValue')
}

function hasVModelProp(props = {}) {
  return Object.prototype.hasOwnProperty.call(props, 'modelValue')
}
