import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CheckBoxUnSelected() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M4.8.5h14.4a4.3 4.3 0 014.3 4.3v14.4a4.3 4.3 0 01-4.3 4.3H4.8a4.3 4.3 0 01-4.3-4.3V4.8A4.3 4.3 0 014.8.5z"
        fill="#fff"
        stroke="#808082"
      />
    </Svg>
  )
}

export default CheckBoxUnSelected
