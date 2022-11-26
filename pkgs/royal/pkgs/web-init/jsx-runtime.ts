import * as emotion from '@emotion/react/jsx-runtime'
export { jsx, jsxs } from './src/core/jsx'
export { Fragment } from 'react'

const w = window as any
w._jsx = (emotion as any).jsx
w._jsxs = (emotion as any).jsxs
