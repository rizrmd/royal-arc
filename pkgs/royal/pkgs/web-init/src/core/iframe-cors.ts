import { waitUntil } from 'web-utils'
import cuid from 'cuid'
export const createFrameCors = (url: string) => {
  const id = `__` + url.replace(/\W/g, '')
  if (!document.querySelector(`#${id}`)) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.id = id

    iframe.src = `${url.endsWith('/') ? url : `${url}/`}_api_frm`
    const onInit = () => {
      iframe.setAttribute('loaded', 'y')
      window.removeEventListener('message', onInit)
    }
    window.addEventListener('message', onInit)
    document.body.appendChild(iframe)
  }

  const wm = {} as Record<string, any>

  const sendRaw = async (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
  ) => {
    const iframe = document.querySelector(`#${id}`) as HTMLIFrameElement

    if (
      !iframe ||
      !iframe.contentWindow ||
      (iframe && iframe.getAttribute('loaded') !== 'y')
    ) {
      await waitUntil(
        () =>
          iframe &&
          iframe.contentWindow &&
          iframe.getAttribute('loaded') === 'y'
      )
    }

    return new Promise((resolve) => {
      if (iframe && iframe.contentWindow) {
        const id = cuid()
        wm[id] = (e: any) => {
          if (id === e.data.id) {
            window.removeEventListener('message', wm[id])
            delete wm[id]
            resolve(e.data.result)
          }
        }
        window.addEventListener('message', wm[id])
        iframe.contentWindow.postMessage({ input, init, id }, '*')
      }
    })
  }

  return {
    send(input: string | RequestInfo | URL, data?: any, headers?: any) {
      const uri = input.toString()
      return sendRaw(
        `${url.endsWith('/') ? url : `${url}/`}${
          uri.startsWith('/') ? uri.substring(1) : uri
        }`,
        data
          ? {
              method: 'post',
              headers: {
                'content-type': 'application/json',
                ...headers,
              },
              body: JSON.stringify(data),
            }
          : {}
      )
    },
  }
}
