import { VitePage } from '@/renderer/pages-soup/vite-page'
import { useWindowSize } from '@react-hook/window-size'
import styled from 'styled-components'

import { Sidebar } from './Sidebar'

const defaultSidebardWidth = 150

export const MainUI: React.VFC<{}> = () => {
  const [width, height] = useWindowSize()

  return (
    <MainUiContainer>
      <Sidebar sidebarWidth={defaultSidebardWidth} />
      <GuiBody style={{ height, width: width - defaultSidebardWidth }}>
        <VitePage />
      </GuiBody>
    </MainUiContainer>
  )
}

const MainUiContainer = styled.div`
  display: flex;
`

const GuiBody = styled.div``
