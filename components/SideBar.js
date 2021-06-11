import React from "react";

import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-community/async-storage";

import Bar from "./design/bar";

export default function SideBar({ setPage, page }) {
  const navigation = useNavigation();

  function SignOut() {
    AsyncStorage.clear();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Bar />
      <TouchableOpacity
        onPress={SignOut}
        style={{
          backgroundColor: "green",
          padding: 10,
          width: "80%",
          borderRadius: 10,
          marginTop: 50,
        }}
      >
        <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
          Click
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "95%",
    height: 80,
    fontSize: 18,
    borderRadius: 20,
    textAlign: "center",
    marginTop: 10,
    justifyContent: "center",

    backgroundColor: "#200250",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 50,
    fontWeight: "bold",
    color: "#004D73",
  },
});
