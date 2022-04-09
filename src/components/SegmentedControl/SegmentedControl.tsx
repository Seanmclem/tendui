import React, { useRef, useState, useEffect } from 'react';
import './styles.css';
import styled from 'styled-components';

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-segmented-control-component
 */
// https://codesandbox.io/s/react-segmented-control-krgq5?file=/src/SegmentedControl.jsx:0-1682

interface SegmentedControlProps {
  name: string;
  segments: any[];
  callback: (arg: string, arg2: number) => void;
  defaultIndex?: number;
}
const SegmentedControl: React.FC<SegmentedControlProps> = ({ name, segments, callback, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const componentReady = useRef<any>();

  const [offsetWidthNumber, setOffsetWidthNumber] = useState('auto');
  const [offsetLeftNumber, setOffsetLeftNumber] = useState(`translateX(0px)`);

  // Determine when the component is "ready"
  useEffect(() => {
    componentReady.current = true;
  }, []);

  useEffect(() => {
    const activeSegmentRef = segments[activeIndex].ref;
    const { offsetWidth, offsetLeft } = activeSegmentRef.current;

    setOffsetWidthNumber(offsetWidth);
    setOffsetLeftNumber(`translateX(${offsetLeft}px)`);
  }, [activeIndex, callback, segments]);

  const onInputChange = (value: string, index: number) => {
    setActiveIndex(index);
    callback(value, index);
  };

  return (
    <div className="controls-container">
      <div className={`controls ${componentReady.current ? 'ready' : 'idle'}`}>
        <Controls123 widthOff={offsetWidthNumber} pos={offsetLeftNumber} />

        {segments?.map((item, i) => (
          <div key={item.value} className={`segment ${i === activeIndex ? 'active' : 'inactive'}`} ref={item.ref}>
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
  );
};

export default SegmentedControl;

const Controls123 = styled.div<{ widthOff: string; pos: string }>`
  width: ${(props) => `${props.widthOff}px`};
  transform: ${(props: any) => props.pos};

  content: '';
  background: #5465ff;
  border-radius: 8px;

  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 0;
  z-index: 0;
  transition: transform 0.3s ease, width 0.3s ease;
`;
