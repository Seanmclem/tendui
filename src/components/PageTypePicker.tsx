import React from 'react';
import { useRef } from 'react';
import SegmentedControl from './SegmentedControl/SegmentedControl';

interface PageTypePickerProps {
  segments: Segment[];
  setSelectedValue: (val: any) => void;
}

export interface Segment {
  /** Text shown */
  label: string;
  /** text-code */
  value: string;
  ref: React.MutableRefObject<undefined>;
}

export const PageTypePicker: React.FC<PageTypePickerProps> = ({ setSelectedValue, segments }) => (
  <SegmentedControl
    name="group-1"
    callback={(val) => setSelectedValue(val)}
    segments={segments}
    //   [
    //   {
    //     label: 'Complete',
    //     value: 'complete',
    //     ref: useRef()
    //   },
    //   {
    //     label: 'Incomplete',
    //     value: 'incomplete',
    //     ref: useRef()
    //   },
    //   {
    //     label: 'Pending',
    //     value: 'pending',
    //     ref: useRef()
    //   }
    // ]}
  />
);
