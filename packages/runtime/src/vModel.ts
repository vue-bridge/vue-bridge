export function patchVModelProp(component: any) {
  if (hasVModelProp(component.props) && hasvModelEvent(component.emits)) {
    checkModelOptions(component.model)
    component.model = {
      prop: 'modelValue',
      event: 'update:modelValue',
    }
  }
}

function hasvModelEvent(emits: string[] | Record<string, any> = []): boolean {
  const events = Array.isArray(emits) ? emits : Object.keys(emits)
  return events.includes('update:modelValue')
}

function hasVModelProp(props = {}) {
  return Array.isArray(props)
    ? props.includes('modelValue')
    : Object.prototype.hasOwnProperty.call(props, 'modelValue')
}

function checkModelOptions(model: any) {
  if (!model) return
  if (model.prop !== 'modelValue' || model.event !== 'update:modelValue') {
    throw new Error(
      "[@vue-bridge/runtime]: don't use the `model` option on components. this plugin needs to override it to ensure v-model cross-compat"
    )
  }
}
