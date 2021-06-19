import React from "react";
import { Text, View, StyleSheet, Animated } from "react-native";

import CustomBtn from "../buttons/CustomBtn";

export default function ModalWindow({ message, func }) {
   return (
      <Animated.View style={[styles.container]}>
         <Text
            style={{
               textAlign: "center",
               fontSize: 25,
               color: "white",
               marginBottom: 10,
            }}
         >
            {message}
         </Text>
         <CustomBtn
            title="Close"
            styles={{
               width: "90%",
               backgroundColor: "#A73333A",
               borderColor: "white",
               borderWidth: 1.5,
            }}
            func={func}
         />
      </Animated.View>
   );
}

const styles = StyleSheet.create({
   container: {
      position: "absolute",
      zIndex: 15,
      width: "90%",
      padding: 15,
      alignItems: "center",
      justifyContent: "space-around",
      borderRadius: 20,
      backgroundColor: "#BE4D4D",
      top: 40,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 10,
      },
      shadowOpacity: 0.53,
      shadowRadius: 13.97,

      elevation: 21,
   },
});
