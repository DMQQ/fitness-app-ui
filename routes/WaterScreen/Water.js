import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as CONST from "../../constants/constants";
import { AuthContext } from "../../context/AuthContext";
import Bar from "../../components/design/bar";
import Form from "../../components/forms/WaterPageForm/Form";
import WaterList from "../../components/forms/WaterPageForm/WaterList";
import BigChart from "../../components/chart/BigChart";
import Icon from "react-native-vector-icons/FontAwesome5";
import UpdateWaterCaruser from "./UpdateWaterCarusel";

export default function Water() {
    const { isAuth } = useContext(AuthContext);
    const [proggress, setProggress] = useState(0);
    const [trigger, setTrigger] = useState(0);
    const [list, setList] = useState();

    const GetWater = async () => {
        if (!isAuth) return;
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
                console.log(err);
            });
    };
    useEffect(() => {
        GetWater();
    }, [trigger, isAuth]);

    useEffect(() => {
        if (list && list?.length > 0) {
            const val = (list[0]?.water / list[0]?.goal) * 100;
            setProggress(val.toFixed(2));
        } else {
            setProggress(0);
        }
    }, [list, isAuth]);

    async function UpdateDailyWater(date, value) {
        if (!isAuth) return;
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
            }
        } catch (error) {
            Alert.alert("Error", "something went wrong");
        }
    }

    const color = list && list[0].water > list[0].goal ? "#0063B8" : "#AF3556";

    return (
        <View style={styles.container}>
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
                    {list ? list[0]?.water : "0"}ml /{" "}
                    {list ? list[0]?.goal : "0"}ml
                </Text>
            </View>
            <UpdateWaterCaruser setTrigger={setTrigger} />
            <Form setTrigger={setTrigger} trigger={trigger} />
            <WaterList list={list} setTrigger={setTrigger} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        marginTop: 50,
        fontSize: 30,
        fontWeight: "bold",
        color: "#004D73",
        letterSpacing: 2,
    },
    chartBox: {
        marginTop: 20,
        paddingTop: 30,
        width: "65%",
        alignItems: "center",
        backgroundColor: "#F8F8F8",
        padding: 10,
        borderRadius: 30,
    },
    results: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
