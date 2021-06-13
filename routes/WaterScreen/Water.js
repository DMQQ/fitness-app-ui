import React, { useContext, useEffect, useReducer, useState } from "react";
import { View, Text } from "react-native";
import * as CONST from "../../constants/constants";
import { AuthContext } from "../../context/AuthContext";
import Bar from "../../components/design/bar";
import Form from "../../components/forms/WaterPageForm/Form";
import WaterList from "../../components/forms/WaterPageForm/WaterList";
import BigChart from "../../components/chart/BigChart";
import Icon from "react-native-vector-icons/FontAwesome5";
import UpdateWaterCaruser from "./UpdateWaterCarusel";

import ModalWindow from "../../components/modal/ModalWindow";

import { styles } from "./styles";

const initVal = {
   show: false,
   message: "",
};

function reducer(state, action) {
   switch (action.type) {
      case "ERROR_MESSAGE":
         return {
            ...state,
            message: action.payload || "Something went wrong :C",
         };
      case "SHOW_ERROR":
         return { ...state, show: true };
      case "HIDE_ERROR":
         return { ...state, show: false };
   }
}

export default function Water() {
   const { isAuth } = useContext(AuthContext);
   const [proggress, setProggress] = useState(0);
   const [trigger, setTrigger] = useState(0);
   const [list, setList] = useState();

   const [errorModal, dispatch] = useReducer(reducer, initVal);

   const GetWater = async () => {
      if (!isAuth) {
         dispatch({ type: "ERROR_MESSAGE", payload: "No user provided" });
         return dispatch({ type: "SHOW_ERROR" });
      }
      await fetch(CONST.BACKEND + "/get/water/" + isAuth.id, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            token: isAuth.jwt,
            User: isAuth.login,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            setList(data);
         })
         .catch((err) => {
            dispatch({ type: "ERROR_MESSAGE", payload: "Fetch error" });
            dispatch({ type: "SHOW_ERROR" });
         });
   };
   useEffect(() => {
      GetWater();
   }, [trigger, isAuth]);

   useEffect(() => {
      if (list && list.length > 0) {
         const val = (list[0]?.water / list[0]?.goal) * 100;
         setProggress(val.toFixed(2));
      } else {
         setProggress(0);
      }
   }, [list, isAuth]);

   const color =
      list && list[0]?.water > list[0]?.goal / 1.5 ? "#0063B8" : "#AF3556";

   function AlertError(message) {
      dispatch({ type: "SHOW_ERROR" });
      dispatch({ type: "ERROR_MESSAGE", payload: message });
   }

   return (
      <View style={styles.container}>
         {errorModal.show && (
            <ModalWindow
               message={errorModal.message}
               position={0}
               func={() => dispatch({ type: "HIDE_ERROR" })}
            />
         )}
         <Text style={styles.title}>
            Water Statistic <Icon name="tint" size={30} color={"#004D73"} />
         </Text>
         <Bar />
         <View style={styles.chartBox}>
            <BigChart
               style={{ alignItems: "center" }}
               size={200}
               width={20}
               proggress={proggress}
               color={color}
            />
            <Text style={styles.results}>
               {list ? list[0]?.water : "0"}ml / {list ? list[0]?.goal : "0"}ml
            </Text>
         </View>
         <UpdateWaterCaruser setTrigger={setTrigger} />
         <Form
            setTrigger={setTrigger}
            trigger={trigger}
            alertError={AlertError}
         />
         <WaterList list={list} setTrigger={setTrigger} />
      </View>
   );
}
