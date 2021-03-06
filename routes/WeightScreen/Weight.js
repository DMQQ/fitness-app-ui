import React, { useContext, useEffect, useState } from "react";

import {
   View,
   Text,
   ScrollView,
   Alert,
   Keyboard,
   ActivityIndicator,
} from "react-native";
import Input from "../../components/forms/input";
import { styles } from "./styles";
import * as CONSTS from "../../constants/constants";
import { AuthContext } from "../../context/AuthContext";

import CustomBtn from "../../components/buttons/CustomBtn";
import Bar from "../../components/design/bar";
import WeightChart from "./WeightChart";
import WeightListItem from "./WeightListItem";

import useGet from "../../hooks/useGet";

export default function Weight() {
   const [weight, setWeight] = useState("");
   const [error, setError] = useState("");
   const [refresh, setRefresh] = useState(0);

   const { isAuth } = useContext(AuthContext);

   const AddWeight = async () => {
      if (!weight) return setError("Fill the form!!");
      if (!isAuth) return setError("No user provided, log in again");
      if (+weight === 0 || +weight > 1000)
         return setError("Enter valid weight");

      await fetch(CONSTS.BACKEND + "/weight", {
         method: "POST",
         body: JSON.stringify({
            weight: +weight,
            user_id: isAuth.id,
         }),
         headers: {
            "Content-Type": "application/json",
            User: isAuth.login,
            token: isAuth.jwt,
         },
      })
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            if (data != null) {
               setWeight("");
               return Keyboard.dismiss();
            }
         })
         .catch((err) => {
            console.log(err);
            setError("Something went wrong during Adding weight");
            Keyboard.dismiss();
         })
         .finally(() => {
            setRefresh(refresh + 1);
            setError("");
         });
   };

   const { data: list, loading } = useGet("/get/weight/" + isAuth.id, [
      refresh,
   ]);

   useEffect(() => {
      if (weight && weight.trim() !== "") {
         setError("");
      }
   }, [weight]);

   const ArrayOfValues =
      list && list.length > 0 && list.map((el) => el.weight).reverse();
   const ArrayOfDates =
      list && list.length > 0 && list.map((el) => el.post_date).reverse();

   const isArrayOfValues = ArrayOfValues ? ArrayOfValues : [100, 200];
   const isArrayOfDates = ArrayOfDates ? ArrayOfDates : ["Error", "Error"];

   async function onSwipeDelete(id) {
      try {
         const res = await fetch(CONSTS.BACKEND + "/delete/weight/" + id, {
            method: "DELETE",
            headers: {
               token: isAuth.jwt,
               User: isAuth.login,
            },
         });
         const data = await res.json();
         if (data !== null) {
            setRefresh(refresh + 1);
         }
      } catch (error) {
         Alert.alert("Error", error);
      }
   }

   return (
      <ScrollView>
         <View style={styles.container}>
            <Text style={styles.title}>Weight</Text>
            <Bar />
            <View style={styles.form}>
               <Text
                  style={[
                     { textAlign: "center", fontSize: 22, padding: 5 },
                     { color: error ? "#E33838" : "#000" },
                  ]}
               >
                  {error ? error : "What's your todays weight?"}
               </Text>
               <Input
                  val={weight}
                  setVal={setWeight}
                  more={{ placeholder: "Weight", style: { margin: 10 } }}
                  error={error}
                  keyboardType="numeric"
               />

               <CustomBtn
                  title="Add Weight"
                  func={AddWeight}
                  styles={{ backgroundColor: "#009B85" }}
               />
               <View style={{ alignItems: "center", padding: 10 }}>
                  <Bar />
               </View>
            </View>
            <View
               style={{
                  width: "100%",
                  padding: 20,
                  marginBottom: 50,
               }}
            >
               <WeightChart values={isArrayOfValues} labels={isArrayOfDates} />

               {list &&
                  list.map((el, index) => (
                     <WeightListItem
                        index={index}
                        el={el}
                        list={list}
                        key={el.id}
                        onSwipeDelete={onSwipeDelete}
                     />
                  ))}
               {loading && <ActivityIndicator size="large" color="green" />}
            </View>
         </View>
      </ScrollView>
   );
}
