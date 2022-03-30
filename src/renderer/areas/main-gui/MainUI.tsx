import { VitePage } from '@/renderer/pages-soup/vite-page'
import { useWindowSize } from '@react-hook/window-size'
import styled from 'styled-components'

import { Sidebar } from './Sidebar'

const defaultSidebardWidth = 150

export const MainUI: React.VFC<{}> = () => {
  const [width, height] = useWindowSize()

  return (
    <MainUiContainer style={{ height: height - 40 }}>
      <Sidebar sidebarWidth={defaultSidebardWidth} />
      <GuiBody style={{ height: '100%', width: width - defaultSidebardWidth }}>
        <VitePage />
      </GuiBody>
    </MainUiContainer>
  )
}

const MainUiContainer = styled.div`
  display: flex;
  /* height: 30%; */
  /* overflow: hidden; */
  /* height: 100%; */
  /* padding-top: 40px; */
`

const GuiBody = styled.div`
  overflow-y: scroll;
`
