import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity, View } from "react-native";

export default function Belt({ functions, more }) {
  return (
    <TouchableOpacity
      style={{ justifyContent: "center", alignItems: "center" }}
      onPress={() => functions()}
    >
      <View style={[styles.belt, more]}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  belt: {
    marginTop: 10,
    width: 100,
    height: 5,
    backgroundColor: "black",
    borderRadius: 10,
  },
});
