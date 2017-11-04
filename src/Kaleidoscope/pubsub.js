export default {
  on (event, listener) {
    if (!this[event]) {
      this[event] = []
    }
    this[event].push(listener)
  },
  emit (event, ...args) {
    const listeners = this[event]
    if (listeners) {
      listeners.forEach(listener => {
        listener(...args)
      })
    }
  }
}
