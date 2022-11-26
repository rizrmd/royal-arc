import * as emotion from '@emotion/react/jsx-dev-runtime'
import { jsx } from './src/core/jsx'
export { Fragment } from 'react'

const w = window as any
w._jsx = (emotion as any).jsxDEV
export const jsxDEV = jsx
