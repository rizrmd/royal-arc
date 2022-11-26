import { WebSocket as uWebSocket } from 'uWebSockets.js'
import { client as WebSocket } from 'websocket'
import { g, MHttpResponse } from '../global'
import { fetchProxy } from './fetch-proxy'
import { IUpstream, localHostName } from './tools'

export const serveExpress = async (
  upstream: IUpstream,
  _pathname: string,
  res: MHttpResponse,
  name: string
) => {
  const port = g.ports[name]

  if (port) {
    const conf = g.config[g.serverName][g.mode]
    const prefix = new URL(conf[name].url).pathname
    const pathname = _pathname.substring(prefix.length)
    if (
      !(await fetchProxy(
        `http://${localHostName}:${port}${
          pathname.startsWith('/') ? pathname : `/${pathname}`
        }`,
        `http://${localHostName}:${port}`,
        `http://${localHostName}:${port}`,
        upstream,
        res,
        ['200', '304', '>=500']
      ))
    ) {
      return false
    }
  } else {
    console.log(
      `Failed to get port for: ${name}, available port: \n${JSON.stringify(
        g.ports,
        null,
        2
      )}`
    )
    return false
  }
  return true
}

export const findServer = (matches: string[]) =>
  matches.find((e) => e.startsWith('srv'))

export const serveExpressWS = (_ws: uWebSocket) => {
  const port = g.ports['srv']
  if (port) {
    const ws = new WebSocket({})

    ws.on('connect', (connection) => {
      g.serverWS.set(_ws, connection)
      connection.on('error', function (error) {
        if (g.serverWS.has(_ws)) g.serverWS.delete(_ws)
      })
      connection.on('close', function () {
        if (g.serverWS.has(_ws)) g.serverWS.delete(_ws)
      })
      connection.on('message', function (message) {
        if (message.type === 'utf8') {
          try {
            _ws.send(message.utf8Data)
          } catch (e) {}
        }
      })
    })
    ws.connect(`ws://${localHostName}:${port}/`)
  }
}
