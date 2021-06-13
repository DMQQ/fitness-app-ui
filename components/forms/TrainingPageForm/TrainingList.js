import React from "react";

//prettier-ignore
import { ScrollView,View,StyleSheet,Text,Alert,ActivityIndicator} from "react-native";

import useFetch from "../../../hooks/useFetch";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { LinearGradient } from "expo-linear-gradient";

import Icon from "react-native-vector-icons/FontAwesome5";

export default function TrainingList({ list, setTrigger }) {
   const { HTTP, error } = useFetch();

   const DeleteActivity = async (id) => {
      await HTTP("/delete/activity/" + id, "DELETE");
      if (!error) {
         setTrigger((trigger) => trigger + 1);
      }
      if (error) {
         Alert.alert("Error", "Sorry but something went wrong!");
      }
   };
   return (
      <ScrollView style={{ width: "100%", marginTop: 15 }}>
         {list ? (
            list.map((activity) => {
               return (
                  <Activity
                     key={activity.id}
                     {...activity}
                     DeleteActivity={DeleteActivity}
                  />
               );
            })
         ) : (
            <ActivityIndicator size="large" color="blue" />
         )}
      </ScrollView>
   );
}

const RightAction = () => {
   return (
      <View
         style={[
            styles.activityContainer,
            {
               backgroundColor: "#A11616",
               alignItems: "flex-end",
               justifyContent: "center",
            },
         ]}
      >
         <Icon
            size={80}
            name="trash"
            color="white"
            style={{ paddingRight: 10 }}
         />
      </View>
   );
};

function Activity({
   id,
   type,
   dateadd,
   distance,
   time,
   calories,
   water,
   DeleteActivity,
}) {
   return (
      <Swipeable
         onSwipeableRightOpen={() => DeleteActivity(id)}
         renderRightActions={RightAction}
      >
         <LinearGradient
            colors={["#4000A8", "#0e0a4f"]}
            start={{ x: 0.2, y: 0.2 }}
            style={styles.activityContainer}
         >
            <View style={styles.headerRow}>
               <View style={styles.iconBox}>
                  {type === "Swimming" && (
                     <Icon name="swimmer" size={50} color="white" />
                  )}
                  {type === "Running" && (
                     <Icon name="running" size={50} color="white" />
                  )}
                  {type === "Cycling" && (
                     <Icon name="bicycle" size={50} color="white" />
                  )}
                  {type === "Walking" && (
                     <Icon name="walking" size={50} color="white" />
                  )}
                  {type === "Fitness" && (
                     <Icon name="dumbbell" size={50} color="white" />
                  )}
                  {type === "Sport" && (
                     <Icon name="volleyball" size={50} color="white" />
                  )}
               </View>
               <View style={styles.titleContainer}>
                  <Text style={styles.title}>{type}</Text>
               </View>
            </View>
            <View style={styles.bodyRow}>
               <View style={styles.item}>
                  <Icon
                     name="tint"
                     size={24}
                     color="white"
                     style={{ paddingRight: 5 }}
                  />
                  <Text style={styles.values}>{water}ml</Text>
               </View>
               <View style={styles.item}>
                  <Icon
                     name="map"
                     size={24}
                     color="white"
                     style={{ paddingRight: 5 }}
                  />
                  <Text style={styles.values}>{distance}km</Text>
               </View>
               <View style={styles.item}>
                  <Icon
                     name="clock"
                     size={24}
                     color="white"
                     style={{ paddingRight: 5 }}
                  />
                  <Text style={styles.values}>{time}h</Text>
               </View>
            </View>
            <View style={styles.bodyRow}>
               <View style={styles.item}>
                  <Icon
                     name="pizza-slice"
                     size={24}
                     color="white"
                     style={{ paddingRight: 5 }}
                  />
                  <Text style={styles.values}>{calories}kcal</Text>
               </View>
               <View style={styles.item}>
                  <Icon
                     name="clock"
                     size={24}
                     color="white"
                     style={{ paddingRight: 5 }}
                  />
                  <Text style={styles.values}>{dateadd}</Text>
               </View>
            </View>
         </LinearGradient>
      </Swipeable>
   );
}

const styles = StyleSheet.create({
   activityContainer: {
      width: "100%",
      padding: 5,
      marginBottom: 10,
      borderColor: "#000",
      borderWidth: 0.5,
      borderRadius: 10,
   },
   iconBox: {
      padding: 10,
   },
   headerRow: {
      flexDirection: "row",
   },
   bodyRow: {
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between",
   },
   titleContainer: {
      padding: 5,
      justifyContent: "center",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "70%",
   },
   title: {
      color: "white",
      fontSize: 30,
      textAlign: "center",
   },
   values: {
      fontSize: 24,
      color: "white",
   },
   item: {
      flexDirection: "row",
      alignItems: "center",
   },
});
