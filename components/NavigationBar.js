import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableHighlight, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const HOME_SCREEN = "HOME";
const FOOD_SCREEN = "FOOD";
const WEIGHT_SCREEN = "WEIGHT";
const WATER_SCREEN = "WATER";
const TRAINING_SCREEN = "TRAINING";

export default function NavigationBar({ setPage, page }) {
   const [scale, setScale] = useState(0.9);
   function ShowNav() {
      setScale(0.9);
   }
   function HideNav() {
      setScale(0);
   }

   useEffect(() => {
      Keyboard.addListener("keyboardDidShow", HideNav);
      Keyboard.addListener("keyboardDidHide", ShowNav);

      return () => {
         Keyboard.removeListener("keyboardDidShow", HideNav);
         Keyboard.removeListener("keyboardDidHide", ShowNav);
      };
   }, []);
   return (
      <View style={[styles.container, { transform: [{ scale: scale }] }]}>
         <TouchableHighlight
            onPress={() => setPage(FOOD_SCREEN)}
            underlayColor="#007A82"
            style={[styles.icon, page === FOOD_SCREEN && styles.active]}
         >
            <Icon
               name="pizza-slice"
               size={30}
               color={page === FOOD_SCREEN ? "white" : "black"}
            />
         </TouchableHighlight>
         <TouchableHighlight
            onPress={() => setPage(WEIGHT_SCREEN)}
            underlayColor="#007A82"
            style={[styles.icon, page === WEIGHT_SCREEN && styles.active]}
         >
            <Icon
               name="weight-hanging"
               size={30}
               color={page === WEIGHT_SCREEN ? "white" : "black"}
            />
         </TouchableHighlight>

         <TouchableHighlight
            onPress={() => setPage(HOME_SCREEN)}
            underlayColor="#007A82"
            style={[styles.icon, page === HOME_SCREEN && styles.active]}
         >
            <Icon
               name="home"
               color={page === HOME_SCREEN ? "white" : "black"}
               size={30}
            />
         </TouchableHighlight>

         <TouchableHighlight
            onPress={() => setPage(WATER_SCREEN)}
            underlayColor="#007A82"
            style={[styles.icon, page === WATER_SCREEN && styles.active]}
         >
            <View>
               <Icon
                  name="tint"
                  size={30}
                  color={page === WATER_SCREEN ? "white" : "black"}
               />
            </View>
         </TouchableHighlight>

         <TouchableHighlight
            onPress={() => setPage(TRAINING_SCREEN)}
            underlayColor="#007A82"
            style={[styles.icon, page === TRAINING_SCREEN && styles.active]}
         >
            <Icon
               name="running"
               size={30}
               color={page === TRAINING_SCREEN ? "white" : "black"}
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
      bottom: 5,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "row",
      shadowColor: "#000",
      shadowOffset: {
         width: 1,
         height: 5,
      },
      shadowOpacity: 1,
      shadowRadius: 5,

      elevation: 20,
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
