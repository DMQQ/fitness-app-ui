import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";

export default function Input({ val, setVal, more, error }) {
  const { placeholder, style } = more;
  const isError = error && "#FF9090";
  return (
    <TextInput
      value={val}
      onChangeText={setVal}
      style={[
        styles.input,
        style,
        {
          backgroundColor: isError,
          color: error && "#fff",
          borderColor: error && "#AC1D1D",
        },
      ]}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    margin: 5,
    borderBottomWidth: 3,
  },
});
