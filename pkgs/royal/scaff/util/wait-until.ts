export const waitUntil = (condition: number | (() => unknown)) => {
  return new Promise<void>((resolve) => {
    if (typeof condition === 'function') {
      let count = 0
      const c = setInterval(async () => {
        count++
        const res = await condition()
        if (res) {
          clearInterval(c)
          resolve()
        }
        if (count > 100) {
          clearInterval(c)
        }
      }, 100)
    } else if (typeof condition === 'number') {
      setTimeout(() => {
        resolve()
      }, condition)
    }
  })
}
