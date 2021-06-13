import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../../hooks/useFetch";

import CustomBtn from "../../buttons/CustomBtn";

import Input from "../input";

export default function Form({ setTrigger, trigger, alertError }) {
   const { isAuth } = useContext(AuthContext);
   const [water, setWater] = useState();
   const { HTTP, loading, data, error } = useFetch();
   const AddWater = async () => {
      if (!water) return alertError("Enter some data!!");
      await HTTP("/post/water", "POST", { water, user_id: isAuth.id }).then(
         () => {
            if (!loading && !error) {
               setTrigger(trigger + 1);
               setWater("");
            }
         }
      );
   };
   return (
      <View style={[styles.form, { backgroundColor: "#fff" }]}>
         <Input
            val={water}
            setVal={setWater}
            more={{ placeholder: "water", style: { width: 300 } }}
            keyboardType="numeric"
         />
         <CustomBtn
            title={loading ? "loading" : "add"}
            styles={{ width: 150, backgroundColor: "#00437C" }}
            func={AddWater}
            icon="tint"
         />
      </View>
   );
}

const styles = StyleSheet.create({
   form: {
      width: "80%",
      alignItems: "center",
      justifyContent: "center",
   },
});
