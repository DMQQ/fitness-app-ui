import React, { useContext, useState } from "react";
import {
   StyleSheet,
   Text,
   TouchableOpacity,
   Alert,
   ActivityIndicator,
   ScrollView,
} from "react-native";
import * as CONSTS from "../../constants/constants";
import { AuthContext } from "../../context/AuthContext";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { WATER_LIST_VALUES } from "../../data/WaterCaruselData";

const CARD_HEIGHT = 40;

export default function UpdateWaterCaruser({ setTrigger }) {
   return (
      <ScrollView
         style={styles.container}
         horizontal
         showsHorizontalScrollIndicator={false}
         bounces={true}
      >
         {WATER_LIST_VALUES.map((item, index) => {
            return (
               <CaruselItem key={index} item={item} setTrigger={setTrigger} />
            );
         })}
      </ScrollView>
   );
}
const CaruselItem = ({ item, setTrigger }) => {
   const { isAuth } = useContext(AuthContext);
   const [loading, setLoading] = useState(false);
   const date = new Date().toDateString().split(" ").slice(1, 4).join(" ");

   async function UpdateDailyWater(date, value) {
      if (!isAuth) return;
      setLoading(true);
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
            setLoading(false);
         }
      } catch (error) {
         Alert.alert("Error", "something went wrong");
         console.log(error);
         setLoading(false);
      }
   }

   return (
      <TouchableOpacity
         style={styles.card}
         activeOpacity={0.8}
         onPress={() => UpdateDailyWater(date, item.value)}
      >
         {!loading ? (
            <>
               <Icon name="cup" size={40} color="white" />
               <Text style={{ color: "white" }}>
                  {item.value > 0 ? "+" + item.value : item.value}
               </Text>
            </>
         ) : (
            <ActivityIndicator color="white" size="large" />
         )}
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   container: {
      margin: 20,
      marginTop: 20,
      height: CARD_HEIGHT + 70,
   },
   card: {
      padding: 10,
      height: 70,
      backgroundColor: "#005CAC",
      alignItems: "center",
      borderRadius: 10,
      marginRight: 10,
      width: 80,
      justifyContent: "center",
   },
});
