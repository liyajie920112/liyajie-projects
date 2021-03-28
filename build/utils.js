exports.formatArguments = function() {
  const args = process.argv
  const obj = {}
  args.forEach(item => {
    const arr = item.split('=')
    let [key, value] = arr
    if (key.startsWith('--')) {
      key = key.slice(2)
    }
    if (!value) {
      obj[key] = true
    } else {
      obj[key] = value || ""
    }
  })
  return obj
}