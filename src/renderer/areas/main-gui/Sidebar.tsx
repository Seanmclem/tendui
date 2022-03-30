import styled from 'styled-components'
import { Spacer } from '../../components/common/Spacer'
import { useMainGuiStore } from './main-gui-store'

interface Props {
  sidebarWidth: number
}

export const Sidebar: React.FC<Props> = ({ sidebarWidth }) => {
  const menuOptions = useMainGuiStore((state) => state.menuOptions)
  const selectedMenuOption = useMainGuiStore(
    (state) => state.selectedMenuOption
  )
  const setSelectedMenuOption = useMainGuiStore(
    (state) => state.setSelectedMenuOption
  )

  return (
    <SidebarContainer sidebarWidth={sidebarWidth}>
      <Spacer height={20} />

      {menuOptions.map((option) => (
        <div key={option}>
          <Text
            selected={selectedMenuOption === option}
            onClick={() => setSelectedMenuOption(option)}
          >
            {option}
          </Text>
        </div>
      ))}
      {/* <TreeList templateChildren={mainTemplate} /> */}
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div<{ sidebarWidth: number }>`
  width: ${(props) => props.sidebarWidth}px;
  /* height: 100%; */
  background-color: lightgray;
`

const Text = styled.div<{ selected?: boolean }>`
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'initial')};
`
