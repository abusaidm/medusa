import React from "react"
import IconProps from "../types"

const IconBarsThree = ({ iconColorClassName, ...props }: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.125 5.00006H16.875M3.125 10H16.875M3.125 15.0001H16.875"
        className={
          iconColorClassName ||
          "stroke-medusa-icon-subtle dark:stroke-medusa-icon-subtle"
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconBarsThree
