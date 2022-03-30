import type * as React from 'react'
import { motion } from 'framer-motion'

import 'xterm/css/xterm.css'

import { useWindowSize } from '@react-hook/window-size'
import TopBar from './components/top-bar'
import { VitePage } from './pages-soup/vite-page'
import { MainUI } from './areas/main-gui/MainUI'
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
  const [_width, height] = useWindowSize()

  return (
    <div tw=" w-screen flex flex-col" style={{ height }}>
      {/* <TopBar /> */}
      <div style={{ height: 40 }}></div>
      {/* <div style={{ height: '2rem' }}></div> */}
      {/* here store like a container for the tap-left-panel, and main UI... copy r3f-stair thing? */}
      {/* <VitePage /> */}
      <MainUI />
    </div>
  )
}

export default App
