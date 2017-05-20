const average = array => {
  let sum = 0
  for(var i = 0; i < array.length; i++) {
    sum += array[i]
  }
  return sum / array.length
}

const averageWindow = size => {
  const memory = []
  return val => {
    if (val !== null) {
      memory.push(val)
    }
    if (memory.length > size) {
      memory.shift()
    }
    return average(memory)
  }
}

export default averageWindow
