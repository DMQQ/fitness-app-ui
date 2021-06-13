import React, { useContext } from "react";
import {
   FlatList,
   View,
   StyleSheet,
   Text,
   TouchableOpacity,
   Alert,
} from "react-native";
import * as CONSTS from "../../constants/constants";
import { AuthContext } from "../../context/AuthContext";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { WATER_LIST_VALUES } from "../../data/WaterCaruselData";

const CARD_HEIGHT = 40;

export default function UpdateWaterCaruser({ setTrigger }) {
   const { isAuth } = useContext(AuthContext);

   async function UpdateDailyWater(date, value) {
      if (!isAuth) return;
      try {
         const res = await fetch(CONSTS.BACKEND + "/update/water/" + date, {
            method: "PUT",
            body: JSON.stringify({ value: value }),
            headers: {
               "Content-Type": "application/json",
               token: isAuth.jwt,
               User: isAuth.login,
            },
         });
         if (!res.ok) {
            return Alert.alert("Error", "Cannot update water :C");
         }
         const data = await res.json();

         if (data != null) {
            setTrigger((trigger) => trigger + 1);
         }
      } catch (error) {
         Alert.alert("Error", "something went wrong");
      }
   }

   return (
      <View style={styles.container}>
         <FlatList
            data={WATER_LIST_VALUES}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => {
               const date = new Date()
                  .toDateString()
                  .split(" ")
                  .slice(1, 4)
                  .join(" ");
               return (
                  <TouchableOpacity
                     style={styles.card}
                     activeOpacity={0.8}
                     onPress={() => UpdateDailyWater(date, item.value)}
                  >
                     <Icon name="cup" size={40} color="white" />
                     <Text style={{ color: "white" }}>
                        {item.value > 0 ? "+" + item.value : item.value}
                     </Text>
                  </TouchableOpacity>
               );
            }}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      margin: 20,
      marginTop: 20,
      height: CARD_HEIGHT + 40,
   },
   card: {
      padding: 10,
      backgroundColor: "#005CAC",
      alignItems: "center",
      borderRadius: 10,
      marginRight: 10,
      width: 80,
   },
});
