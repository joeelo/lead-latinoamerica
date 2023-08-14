const nestData = (obj, ...args) => {
  for (let arg of args) {
    if (args) obj[arg] = true
  }
  return obj
}

export default nestData
