import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import NavigationBar from "../components/NavigationBar";
import SideBar from "../components/SideBar";
import Water from "./WaterScreen/Water";
import Weight from "./WeightScreen/Weight";
import Training from "./TrainingScreen/Training";
import { AuthContext } from "../context/AuthContext";
import Bar from "../components/design/bar";
import useFetch from "../hooks/useFetch";
import HomePage from "./HomeScreen/HomePage";
import Icon from "react-native-vector-icons/FontAwesome5";

const Home = ({ navigation }) => {
    const [page, setPage] = useState("HOME");
    const { isAuth } = useContext(AuthContext);
    const { HTTP, data: list, error } = useFetch();
    const [data, setData] = useState([]);
    useEffect(() => {
        async function Fetch() {
            await HTTP("/get/activity/" + isAuth?.id, "GET");
            if (error) {
                Alert.alert("Error", "Something went wrong");
            }
        }
        if (isAuth) Fetch();
    }, [isAuth, page]);

    useEffect(() => {
        setData(list);
    }, [list, page]);

    useEffect(() => {
        if (!isAuth) {
            navigation.navigate("Login");
        }
    }, [isAuth]);

    return (
        <View style={styles.container}>
            {page === "HOME" && (
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.headerText}>
                        Hello {isAuth?.login ? isAuth.login : "unknown"}{" "}
                        <Icon name="users" size={30} color="#004D73" />
                    </Text>
                    <Bar />
                </View>
            )}
            {page === "HOME" && <HomePage data={data} id={isAuth?.id} />}
            {page === "WATER" && <Water />}
            {page === "TRAINING" && <Training />}
            {page === "WEIGHT" && <Weight />}
            {page === "SIDEBAR" && <SideBar {...{ setPage, page }} />}

            <NavigationBar setPage={setPage} page={page} />
        </View>
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
