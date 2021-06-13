import React, { useContext, useEffect, useState, Suspense } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import NavigationBar from "../components/NavigationBar";
import { AuthContext } from "../context/AuthContext";
import Bar from "../components/design/bar";
import Icon from "react-native-vector-icons/FontAwesome5";
import useGet from "../hooks/useGet";
import Loader from "../components/Loader/Loader";
import Sidebar from "../components/Sidebar/Sidebar";

const Food = React.lazy(() => import("./FoodScreen/Food"));
const Weight = React.lazy(() => import("./WeightScreen/Weight"));
const Training = React.lazy(() => import("./TrainingScreen/Training"));
const HomePage = React.lazy(() => import("./HomeScreen/HomePage"));
const Water = React.lazy(() => import("./WaterScreen/Water"));

const Home = ({ navigation }) => {
   const [page, setPage] = useState("HOME");
   const { isAuth } = useContext(AuthContext);

   const { data: water } = useGet("/get/water/" + isAuth?.id, [page]);
   const { data: food } = useGet("/get/food/" + isAuth?.id, [page]);

   useEffect(() => {
      if (!isAuth) {
         navigation.navigate("Login");
      }
   }, [isAuth]);

   const [showSidebar, setShowSidebar] = useState(-150);

   return (
      <View style={styles.container}>
         <Suspense fallback={<Loader />}>
            {page === "HOME" && (
               <>
                  <View style={{ alignItems: "center" }}>
                     <Text style={styles.headerText}>
                        Hello {isAuth ? isAuth.login : "unknown"}{" "}
                        <Icon name="users" size={30} color="#004D73" />
                     </Text>
                     <Bar />
                  </View>
                  <SideBarBtn
                     func={() => setShowSidebar(showSidebar === 0 ? -150 : 0)}
                  />
                  <Sidebar currentPos={showSidebar} />
               </>
            )}
            {page === "HOME" && (
               <HomePage id={isAuth?.id} waterData={water} food={food} />
            )}
            {page === "WATER" && <Water />}
            {page === "TRAINING" && <Training />}
            {page === "WEIGHT" && <Weight />}
            {page === "FOOD" && <Food />}
         </Suspense>
         <NavigationBar setPage={setPage} page={page} />
      </View>
   );
};

const SideBarBtn = ({ func }) => {
   return (
      <TouchableOpacity
         style={{
            width: 35,
            height: 30,
            position: "absolute",
            right: 10,
            top: 50,
            alignItems: "flex-end",
            justifyContent: "space-around",
         }}
         onPress={func}
      >
         <View
            style={{
               width: "100%",
               height: 4,
               backgroundColor: "#004076",
            }}
         ></View>
         <View
            style={{
               width: "80%",
               height: 4,
               backgroundColor: "#004076",
            }}
         ></View>
         <View
            style={{
               width: "40%",
               height: 4,
               backgroundColor: "#004076",
            }}
         ></View>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white",
   },
   headerText: {
      fontSize: 30,
      marginTop: 50,
      fontWeight: "bold",
      color: "#004D73",
   },
});
export default Home;
