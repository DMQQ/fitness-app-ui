import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";

export default function Statsbar({ data }) {
   return (
      <View style={styles.statsContainer}>
         <View style={styles.catContainer}>
            <Text style={{ fontSize: 22, color: "white" }}>Proteins</Text>
            <Text style={{ fontSize: 18, color: "white" }}>100g</Text>
         </View>

         <View style={styles.catContainer}>
            <Text style={{ fontSize: 22, color: "#E59D23" }}>Fats</Text>
            <Text style={{ fontSize: 18, color: "white" }}>100g</Text>
         </View>
         <View style={styles.catContainer}>
            <Text style={{ fontSize: 22, color: "#008A5C" }}>Carbs</Text>
            <Text style={{ fontSize: 18, color: "white" }}>100g</Text>
         </View>
      </View>
   );
}
