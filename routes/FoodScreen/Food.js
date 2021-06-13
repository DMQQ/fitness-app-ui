import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "./styles";
import Bar from "../../components/design/bar";
import useGet from "../../hooks/useGet";
import FoodForm from "./Form/FoodForm";
import { AuthContext } from "../../context/AuthContext";
import FoodList from "./List/FoodList";
import CustomBtn from "../../components/buttons/CustomBtn";
import BigChart from "../../components/chart/BigChart";

export default function Food() {
   const [trigger, setTrigger] = useState(0);
   const [showForm, setShowForm] = useState(false);
   const { isAuth } = useContext(AuthContext);
   const { data } = useGet("/get/food/" + isAuth?.id, [trigger, isAuth]);
   const [proggress, setProggress] = useState(0);

   useEffect(() => {
      if (data) {
         setProggress(data && (data[0]?.calories / 3000) * 100);
      }
   }, [data, trigger, isAuth]);

   return (
      <ScrollView style={styles.container} bounces>
         <View
            style={{ alignItems: "center", width: "100%", marginBottom: 50 }}
         >
            <Text style={styles.title}>Food</Text>
            <Bar />
         </View>
         <View style={styles.chartContainer}>
            {!!proggress && (
               <BigChart
                  size={200}
                  width={20}
                  proggress={proggress}
                  color="#A10000"
               />
            )}
            {!!proggress && (
               <Text style={{ fontSize: 30 }}>
                  {data[0]?.calories + "kcal" || "0" + "kcal"}
               </Text>
            )}
         </View>
         <View style={{ width: "100%", alignItems: "center" }}>
            <CustomBtn
               func={() => setShowForm(!showForm)}
               title={showForm ? "Hide meal" : "Add meal"}
               icon="pizza-slice"
               styles={{ width: "50%" }}
            />
         </View>

         {showForm && (
            <FoodForm setTrigger={setTrigger} setShowForm={setShowForm} />
         )}

         <FoodList data={data} setTrigger={setTrigger} />
      </ScrollView>
   );
}
