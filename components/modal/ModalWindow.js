import React from "react";
import { Text, View, StyleSheet } from "react-native";

import CustomBtn from "../buttons/CustomBtn";

export default function ModalWindow({ message }) {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 25 }}>{message}</Text>
      <CustomBtn title="Close" styles={{ width: "95%" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 180,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 20,
    backgroundColor: "#F4F4F4",
  },
});
