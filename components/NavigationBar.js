import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function NavigationBar({ setPage, page }) {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => setPage("SIDEBAR")}
        underlayColor="#007A82"
        style={[styles.icon, page === "SIDEBAR" && styles.active]}
      >
        <Icon
          name="bars"
          size={30}
          color={page === "SIDEBAR" ? "white" : "black"}
        />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => setPage("WEIGHT")}
        underlayColor="#007A82"
        style={[styles.icon, page === "WEIGHT" && styles.active]}
      >
        <Icon
          name="weight-hanging"
          size={30}
          color={page === "WEIGHT" ? "white" : "black"}
        />
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => setPage("HOME")}
        underlayColor="#007A82"
        style={[styles.icon, page === "HOME" && styles.active]}
      >
        <Icon
          name="home"
          color={page === "HOME" ? "white" : "black"}
          size={30}
        />
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => setPage("WATER")}
        underlayColor="#007A82"
        style={[styles.icon, page === "WATER" && styles.active]}
      >
        <View>
          <Icon
            name="tint"
            size={30}
            color={page === "WATER" ? "white" : "black"}
          />
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => setPage("TRAINING")}
        underlayColor="#007A82"
        style={[styles.icon, page === "TRAINING" && styles.active]}
      >
        <Icon
          name="running"
          size={30}
          color={page === "TRAINING" ? "white" : "black"}
        />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    padding: 20,
    backgroundColor: "white",
    width: "100%",
    height: 65,
    position: "absolute",
    bottom: 0,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,

    elevation: 15,
  },
  icon: {
    padding: 5,
    height: 50,
    justifyContent: "center",
    borderRadius: 20,
    width: 50,
    alignItems: "center",
  },
  active: {
    backgroundColor: "#0046BC",
    transform: [{ translateY: -3 }],
  },
});
