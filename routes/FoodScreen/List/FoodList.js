import React, { useContext } from "react";
import { View, FlatList, Text, Alert } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { styles } from "../styles";
import * as CONST from "../../../constants/constants";
import { AuthContext } from "../../../context/AuthContext";

export default function FoodList({ data, setTrigger }) {
   const { isAuth } = useContext(AuthContext);

   async function DeleteFood(id) {
      try {
         const res = await fetch(CONST.BACKEND + "/delete/food/" + id, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               User: isAuth?.login,
               token: isAuth?.jwt,
            },
         });
         if (res.status === 200) {
            setTrigger((trigger) => trigger + 1);
         }
         if (res.status === 400) {
            Alert.alert("Error", "Cannot delete meal :C");
         }
      } catch (error) {
         Alert.alert("Error", "Failed to delete");
      }
   }

   const RightAction = () => {
      return (
         <View style={styles.RightAction}>
            <Text style={{ textAlign: "right", color: "white", fontSize: 20 }}>
               Delete
            </Text>
         </View>
      );
   };

   return (
      <View style={{ width: "100%", padding: 20 }}>
         {data &&
            data.map((item) => {
               return (
                  <Swipeable
                     renderRightActions={RightAction}
                     onSwipeableRightOpen={() => DeleteFood(item.id)}
                     key={item.id}
                  >
                     <View style={styles.ListItemContainer}>
                        <Text style={{ fontSize: 20, color: "white" }}>
                           {item.calories}kcal
                        </Text>
                        <Text style={{ fontSize: 20, color: "white" }}>
                           {item.carbs}c
                        </Text>
                        <Text style={{ fontSize: 20, color: "white" }}>
                           {item.fats}f
                        </Text>
                        <Text style={{ fontSize: 20, color: "white" }}>
                           {item.proteins}p
                        </Text>
                     </View>
                  </Swipeable>
               );
            })}
      </View>
   );
}
