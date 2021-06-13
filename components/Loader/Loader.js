import React from "react";

import { View, ActivityIndicator } from "react-native";

export default function Loader() {
   return (
      <View
         style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
         <ActivityIndicator size="large" color="#3C009D" />
      </View>
   );
}
