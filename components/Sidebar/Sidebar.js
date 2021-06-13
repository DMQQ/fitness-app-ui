import React from "react";
import { Animated, View, StyleSheet, Text, Dimensions } from "react-native";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const SIDEBAR_WIDTH = 150;

export default function Sidebar({ currentPos = -SIDEBAR_WIDTH }) {
   return (
      <Animated.View
         style={[styles.container, { transform: [{ translateX: currentPos }] }]}
      >
         <Text>Test</Text>
      </Animated.View>
   );
}

const styles = StyleSheet.create({
   container: {
      position: "absolute",
      width: SIDEBAR_WIDTH,
      height: WINDOW_HEIGHT + 60,
      paddingTop: 40,
      alignItems: "center",
      zIndex: 2,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: {
         width: 5,
         height: 5,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3.84,

      elevation: 10,
   },
});
