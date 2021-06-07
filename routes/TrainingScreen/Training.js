import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Bar from '../../components/design/bar';

import BigChart from '../../components/chart/BigChart';
import TrainingFrom from '../../components/forms/TrainingPageForm/TrainingForm';
import CustomBtn from '../../components/buttons/CustomBtn';
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../context/AuthContext';
import TrainingList from '../../components/forms/TrainingPageForm/TrainingList';

export default function Training() {
	const [addActivity, setAddActivity] = useState(false);
	const { isAuth } = useContext(AuthContext);
	const [trigger, setTrigger] = useState(0);

	const { HTTP, data: list, error } = useFetch();

	const GetTrainings = async () => {
		await HTTP('/get/activity/' + isAuth.id, 'GET');
		if (error) {
			Alert.alert('Error', 'Sorry, but someting went wrong');
		}
	};

	useEffect(() => {
		GetTrainings();
	}, [trigger]);

	const [time, setTime] = useState(0);
	const [water, setWater] = useState(0);
	const [distance, setDistance] = useState(0);

	useEffect(() => {
		if (list?.length > 0) {
			setTime(list[0]?.time);
			setWater(list[0]?.water);
			setDistance(list[0]?.distance);
		}
	}, [list, trigger]);

	const WaterGoal = 2000;
	const DistanceGoal = 20;
	const TimeGoal = 5;

	return (
		<ScrollView style={{ marginBottom: 60 }}>
			<ImageBackground source={require('../../images/bg.jpg')} style={styles.container}>
				<Text style={styles.title}>
					Training <Icon name="running" size={30} color="white" />
				</Text>
				<Bar />
				<View style={styles.rowDiv}>
					<BigChart size={110} color={'#EA8500'} proggress={(time / TimeGoal) * 100} width={15} />
					<BigChart size={110} color={'#4500EE'} proggress={(water / WaterGoal) * 100} width={15} />
					<BigChart size={110} color={'#B83030'} proggress={(distance / DistanceGoal) * 100} width={15} />
				</View>
				<View style={[styles.rowDiv, { justifyContent: 'space-around' }]}>
					<Text style={styles.text}>{time}h</Text>
					<Text style={styles.text}>{water}ml</Text>
					<Text style={styles.text}>{distance}km</Text>
				</View>
			</ImageBackground>
			{addActivity && (
				<CustomBtn
					title="X"
					styles={{ width: 35, padding: 5, margin: 10 }}
					color="black"
					func={() => setAddActivity(false)}
				/>
			)}
			<View>
				{!addActivity ? (
					<View style={{ alignItems: 'center' }}>
						<CustomBtn
							title="Add Activity"
							func={() => setAddActivity(!addActivity)}
							styles={{ marginTop: 30, width: '80%', borderRadius: 10 }}
							color="#004D73"
							icon="running"
						/>
					</View>
				) : (
					<TrainingFrom setTrigger={setTrigger} />
				)}
				<View style={{ alignItems: 'center', margin: 20 }}>
					<Bar />
					<TrainingList list={list} setTrigger={setTrigger} />
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center'
	},
	title: {
		marginTop: 50,
		fontSize: 30,
		color: '#fff',
		fontWeight: 'bold',
		letterSpacing: 2
	},
	rowDiv: {
		marginTop: 20,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	text: {
		fontSize: 22,
		color: '#004D73',
		padding: 10,
		color: '#fff'
	}
});
