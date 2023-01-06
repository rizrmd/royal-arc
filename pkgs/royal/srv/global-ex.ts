import { ReadStream } from 'fs'
import { _names } from 'gen'
import { ReactElement } from 'react'
import {
  HttpRequest,
  HttpResponse,
  TemplatedApp,
  us_listen_socket,
} from 'uWebSockets.js'
import { g } from '../global'
import { sendRequest } from '../uws/fetch-proxy'
import fetch from 'node-fetch-commonjs'

export type UploadedFile = {
  data: ArrayBuffer
  name: string
  filename: string
  type: string
}

export type SSROverride = Awaited<ReturnType<typeof sendRequest>>

type OverrideBody = (
  body: string | ArrayBuffer
) => string | ArrayBuffer | Promise<string | ArrayBuffer | false> | false

type OverrideHeaders = (
  headers: Record<string, string>
) =>
  | false
  | Record<string, string>
  | Promise<Record<string, string>>
  | Promise<false>
export type SrvHttpResponse = HttpResponse & {
  aborted?: boolean
  sentStatus?: number
  sentHeader?: boolean
  sentBody?: any
  send: (data: string | number | object | ReactElement) => void
  sendStatus: (code: number) => void
  sendFile: (filepath: string) => Promise<void>
  webName?: string
  fileCache: Record<string, { mime: string; src: Buffer | string }>
  sendStream: (
    stream: ReadStream,
    totalSize: number,
    onData?: (chunk: string | Buffer) => void
  ) => Promise<void>
  sendStreamLastOffset: number
  sendHeader: (key: string, value: string) => void
  sendFetch: (
    fetchResult: Awaited<ReturnType<typeof fetch>>,
    opt?: {
      body?: OverrideBody
      headers?: OverrideHeaders
    }
  ) => Promise<void>
  sendSSR: (arg: {
    prefix?: string
    body?: OverrideBody
    headers?: OverrideHeaders
  }) => Promise<void>
  redirect: (url: string, code?: number) => void
}

export type SrvHttpRequest = HttpRequest & {
  url: string
  queryString: string
  method: ReturnType<HttpRequest['getMethod']>
  query?: Record<string, string>
  body?: any
  params: any
  headers: Record<string, string>
}

export const ex = global as unknown as {
  app: TemplatedApp
  socket: us_listen_socket
}

export type SrvParams = {
  current: { serviceName: _names; pid: string }
  global: {
    serverName: typeof g['serverName']
    config: typeof g['config']
    mode: typeof g['mode']
  }
}

export const statusCode = {
  '100': 'Continue',
  '101': 'Switching Protocols',
  '102': 'Processing',
  '200': 'OK',
  '201': 'Created',
  '202': 'Accepted',
  '203': 'Non-authoritative Information',
  '204': 'No Content',
  '205': 'Reset Content',
  '206': 'Partial Content',
  '207': 'Multi-Status',
  '208': 'Already Reported',
  '226': 'IM Used',
  '300': 'Multiple Choices',
  '301': 'Moved Permanently',
  '302': 'Found',
  '303': 'See Other',
  '304': 'Not Modified',
  '305': 'Use Proxy',
  '307': 'Temporary Redirect',
  '308': 'Permanent Redirect',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '402': 'Payment Required',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Method Not Allowed',
  '406': 'Not Acceptable',
  '407': 'Proxy Authentication Required',
  '408': 'Request Timeout',
  '409': 'Conflict',
  '410': 'Gone',
  '411': 'Length Required',
  '412': 'Precondition Failed',
  '413': 'Payload Too Large',
  '414': 'Request-URI Too Long',
  '415': 'Unsupported Media Type',
  '416': 'Requested Range Not Satisfiable',
  '417': 'Expectation Failed',
  '418': 'Im a teapot',
  '421': 'Misdirected Request',
  '422': 'Unprocessable Entity',
  '423': 'Locked',
  '424': 'Failed Dependency',
  '426': 'Upgrade Required',
  '428': 'Precondition Required',
  '429': 'Too Many Requests',
  '431': 'Request Header Fields Too Large',
  '444': 'Connection Closed Without Response',
  '451': 'Unavailable For Legal Reasons',
  '499': 'Client Closed Request',
  '500': 'Internal Server Error',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
  '505': 'HTTP Version Not Supported',
  '506': 'Variant Also Negotiates',
  '507': 'Insufficient Storage',
  '508': 'Loop Detected',
  '510': 'Not Extended',
  '511': 'Network Authentication Required',
  '599': 'Network Connect Timeout Error',
}
