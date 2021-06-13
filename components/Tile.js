import React from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Icon from "react-native-vector-icons/FontAwesome5";

export function Tiles({ color, data }) {
   return (
      <Animated.View style={[styles.container, { backgroundColor: color }]}>
         <View style={styles.row}>
            {data &&
               data.map((el) => {
                  return <Row key={el.id} {...el} />;
               })}
         </View>
      </Animated.View>
   );
}

export const TrippleTile = ({ data = [] }) => {
   return (
      <LinearGradient
         colors={["#0046BC", "#00C0D8"]}
         style={{
            width: "100%",
            height: 180,
            borderRadius: 25,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
         }}
         start={{ x: 0.9, y: 0.6 }}
      >
         {data.map((el, index) => {
            const { name, icon, data } = el;
            return (
               <View
                  key={index}
                  style={{
                     flex: 1,
                     margin: 10,
                     padding: 5,
                     alignItems: "center",
                     justifyContent: "space-around",
                  }}
               >
                  <Text
                     style={{
                        textAlign: "center",
                        fontSize: 23,
                        color: "white",
                        fontWeight: "bold",
                     }}
                  >
                     {name}
                  </Text>
                  <Icon name={icon} color="#fff" size={45} />
                  <Text style={{ color: "white", fontSize: 20 }}>
                     {data || "0"}
                  </Text>
               </View>
            );
         })}
      </LinearGradient>
   );
};

export function Tile({ color, icon, data, legend }) {
   return (
      <LinearGradient
         colors={color}
         start={{ x: 0.3, y: 0.2 }}
         style={[
            styles.container,
            {
               width: "48%",
               justifyContent: "center",
               alignItems: "center",
            },
         ]}
      >
         <Row
            {...{
               icon: icon,
               data: data,
               legend: legend,
            }}
         />
      </LinearGradient>
   );
}

const Row = ({ icon, data, legend }) => {
   return (
      <View style={styles.RowComponent}>
         <Icon size={50} color="white" name={icon} />
         <Text style={styles.text}>{data}</Text>
         <Text style={styles.legend}>{legend}</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: "100%",
      marginBottom: 20,
      height: 170,
      borderRadius: 20,
      /*  backgroundColor: "#009B85", */
   },
   row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      height: "100%",
   },
   RowComponent: {
      padding: 10,
      width: 155,
      height: "90%",
      alignItems: "center",
   },
   text: {
      fontSize: 30,
      color: "white",
      fontWeight: "bold",
      padding: 5,
   },
   legend: {
      fontSize: 18,
      padding: 5,
      color: "white",
   },
});
