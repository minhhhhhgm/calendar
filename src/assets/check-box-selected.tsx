import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function CheckBoxSelected() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    
    >
      <Rect width={24} height={24} rx={8} fill="#fff" />
      <Path
        d="M19.2 0H4.8A4.8 4.8 0 000 4.8v14.4A4.8 4.8 0 004.8 24h14.4a4.8 4.8 0 004.8-4.8V4.8A4.8 4.8 0 0019.2 0z"
        fill="#16AB89"
      />
      <Path
        d="M7.563 11.46l-1.614 1.614 4.034 4.034 1.613-1.614-4.033-4.033z"
        fill="#fff"
      />
      <Path
        d="M16.436 7.43l-8.067 8.066 1.613 1.613 8.067-8.066-1.613-1.614z"
        fill="#fff"
      />
    </Svg>
  )
}

export default CheckBoxSelected
