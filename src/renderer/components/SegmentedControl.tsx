import { useRef, useState, useEffect } from 'react'
import './styles.css'

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-segmented-control-component
 */
// https://codesandbox.io/s/react-segmented-control-krgq5?file=/src/SegmentedControl.jsx:0-1682

interface SegmentedControlProps {
  name: string
  segments: any[]
  callback: (arg: string, arg2: number) => void
  defaultIndex?: number
}
const SegmentedControl: React.FC<SegmentedControlProps> = ({
  name,
  segments,
  callback,
  defaultIndex = 0
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const componentReady = useRef<any>()

  // Determine when the component is "ready"
  useEffect(() => {
    componentReady.current = true
  }, [])

  useEffect(() => {
    const activeSegmentRef = segments[activeIndex].ref
    const { offsetWidth, offsetLeft } = activeSegmentRef.current
    const { style } = document.documentElement

    style.setProperty('--highlight-width', `${offsetWidth}px`)
    style.setProperty('--highlight-x-pos', `${offsetLeft}px`)
  }, [activeIndex, callback, segments])

  const onInputChange = (value: string, index: number) => {
    setActiveIndex(index)
    callback(value, index)
  }

  return (
    <div className="controls-container">
      <div className={`controls ${componentReady.current ? 'ready' : 'idle'}`}>
        {segments?.map((item, i) => (
          <div
            key={item.value}
            className={`segment ${i === activeIndex ? 'active' : 'inactive'}`}
            ref={item.ref}
          >
            <input
              type="radio"
              value={item.value}
              id={item.label}
              name={name}
              onChange={() => onInputChange(item.value, i)}
              checked={i === activeIndex}
            />
            <label htmlFor={item.label}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SegmentedControl
