import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function ChartTile({ title, legend, proggress, color, style }) {
  return (
    <View style={[styles.container, { style }]}>
      <TouchableOpacity activeOpacity={0.8}>
        <>
          <Text style={[styles.title, { fontSize: 25 }]}>{title}</Text>
          <AnimatedCircularProgress
            size={120}
            width={15}
            fill={+proggress}
            lineCap="round"
            backgroundWidth={10}
            tintColor={color}
            backgroundColor="#28292C"
            padding={5}
            style={{ alignItems: "center" }}
          />
          <Text style={styles.title}>{legend}</Text>
        </>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "49%",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#34363A",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "#F2ECFF",
  },
});
