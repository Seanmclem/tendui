import { useRef } from 'react'
import SegmentedControl from './SegmentedControl'

interface PageTypePickerProps {
  setSelectedValue: (val: any) => void
}

export const PageTypePicker: React.FC<PageTypePickerProps> = ({
  setSelectedValue
}) => (
  <SegmentedControl
    name="group-1"
    callback={(val) => setSelectedValue(val)}
    segments={[
      {
        label: 'Complete',
        value: 'complete',
        ref: useRef()
      },
      {
        label: 'Incomplete',
        value: 'incomplete',
        ref: useRef()
      },
      {
        label: 'Pending',
        value: 'pending',
        ref: useRef()
      }
    ]}
  />
)
