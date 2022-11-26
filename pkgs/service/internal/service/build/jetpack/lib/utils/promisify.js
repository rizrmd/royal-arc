'use strict'

module.exports = (fn) => {
  return function () {
    const length = arguments.length
    const args = new Array(length)

    for (let i = 0; i < length; i += 1) {
      args[i] = arguments[i]
    }

    return new Promise((resolve, reject) => {
      args.push((err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
      if (Array.isArray(args) && args) {
        for (const v of args) {
          if (typeof v === 'object' && !Array.isArray(v)) {
            for (const [i, j] of Object.entries(v)) {
              if (j === undefined) {
                delete v[i]
              }
            }
          }
        }
      }
      fn.apply(null, args)
    })
  }
}
