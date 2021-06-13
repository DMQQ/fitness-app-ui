import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";

export default function Input({ val, setVal, more, error, ...rest }) {
   const { placeholder, style } = more;
   const isError = error ? "#FF9090" : "white";
   return (
      <TextInput
         value={val}
         onChangeText={setVal}
         style={[
            styles.input,
            style,
            {
               backgroundColor: isError,
               color: error ? "#ffffff" : "#000",
            },
         ]}
         placeholder={placeholder}
         {...rest}
      />
   );
}

const styles = StyleSheet.create({
   input: {
      padding: 10,
      margin: 5,
      borderBottomWidth: 3,
      color: "#000",
   },
});
