import React, { useContext, useState } from "react";
import { ScrollView, Alert } from "react-native";
import { styles } from "../styles";

import Input from "../../../components/forms/input";
import CustomBtn from "../../../components/buttons/CustomBtn";

import * as CONSTS from "../../../constants/constants";
import { AuthContext } from "../../../context/AuthContext";

function isInputValid(value) {
   const isValid = value.trim() !== "" && value.length > 1;
   return isValid;
}

export default function FoodForm({ setTrigger, setShowForm }) {
   const [proteins, setProteins] = useState("");
   const [carbs, setCarbs] = useState("");
   const [fats, setFats] = useState("");
   const [calories, setCalories] = useState("");
   const { isAuth } = useContext(AuthContext);

   const AddFood = async function () {
      if (
         isInputValid(proteins) &&
         isInputValid(carbs) &&
         isInputValid(fats) &&
         isInputValid(calories) &&
         isAuth
      ) {
         try {
            const res = await fetch(CONSTS.BACKEND + "/post/food", {
               method: "POST",
               body: JSON.stringify({
                  proteins,
                  carbs,
                  fats,
                  calories: +calories,
               }),
               headers: {
                  "Content-Type": "application/json",
                  User: isAuth?.login,
                  token: isAuth?.jwt,
               },
            });
            const data = await res.json();

            if (data != null && data != undefined) {
               setTrigger((trigger) => trigger + 1);
               setShowForm(false);
            }
         } catch (error) {
            Alert.alert("Error", error);
         }
      } else {
         Alert.alert("Fill the fields");
      }
   };

   return (
      <ScrollView style={styles.formContainer}>
         <Input
            more={{ placeholder: "proteins" }}
            val={proteins}
            setVal={setProteins}
            keyboardType="numeric"
         />
         <Input
            more={{ placeholder: "carbs" }}
            val={carbs}
            setVal={setCarbs}
            keyboardType="numeric"
         />
         <Input
            more={{ placeholder: "fats" }}
            val={fats}
            setVal={setFats}
            keyboardType="numeric"
         />
         <Input
            more={{ placeholder: "calories" }}
            val={calories}
            setVal={setCalories}
            keyboardType="numeric"
         />
         <CustomBtn
            title="Add"
            icon="pizza-slice"
            styles={{ backgroundColor: "#004D73", marginTop: 15 }}
            func={AddFood}
         />
      </ScrollView>
   );
}
