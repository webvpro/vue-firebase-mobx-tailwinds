import { createOvermind } from 'overmind'
import { createPlugin } from 'overmind-vue'


const overmind = createOvermind({
  state: {
    foo: 'bar'
  },
  actions: {
    onClick() {}
  }
})

export const OvermindPlugin = createPlugin(overmind)