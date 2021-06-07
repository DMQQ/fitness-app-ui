import { AnimatedCircularProgress } from "react-native-circular-progress";
import React from "react";

export default function BigChart({
  style,
  proggress,
  color,
  size = 120,
  width = 10,
}) {
  return (
    <AnimatedCircularProgress
      size={size}
      width={width}
      fill={+proggress}
      lineCap="round"
      backgroundWidth={10}
      lineCap="round"
      tintColor={color}
      backgroundColor="#E3E3E3"
      padding={5}
      style={style}
    />
  );
}
