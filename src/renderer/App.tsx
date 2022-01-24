import type * as React from 'react'
import { motion } from 'framer-motion'

import 'xterm/css/xterm.css'

import TopBar from './components/top-bar'
import { VitePage } from './pages-soup/vite-page'
// red underline, ok for now - Issue: https://github.com/maxstue/vite-reactts-electron-starter/issues/15

// const containerMotion = {
//   initial: 'hidden',
//   animate: 'visible',
//   variants: {
//     hidden: { opacity: 1, scale: 0 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         delayChildren: 0.3,
//         staggerChildren: 0.2
//       }
//     }
//   }
// }

function App() {
  return (
    <div tw="h-screen w-screen flex flex-col pt-12">
      <TopBar />
      <VitePage />
    </div>
  )
}

export default App
