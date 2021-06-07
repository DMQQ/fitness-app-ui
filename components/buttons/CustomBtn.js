import React from "react";

import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function CustomBtn({
  title,
  func,
  color = "orange",
  styles,
  icon,
}) {
  return (
    <TouchableOpacity
      style={[
        {
          padding: 15,
          fontSize: 22,
          textAlign: "center",
          color: "white",
          borderRadius: 20,
          margin: 5,
          backgroundColor: color,
          flexDirection: "row",
          justifyContent: "space-evenly",
        },
        styles,
      ]}
      activeOpacity={0.8}
      onPress={func}
    >
      {!!icon && <Icon name={icon} size={24} color="white" />}
      <Text
        style={{
          fontSize: 20,
          color: "white",
          textAlign: "center",
          justifyContent: "space-around",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
