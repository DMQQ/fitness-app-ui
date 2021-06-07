import { StyleSheet, View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { Tile, TrippleTile } from '../../components/Tile';
import ChartTile from '../../components/chart/chartTile';
import Bar from '../../components/design/bar';
import useGet from '../../hooks/useGet';

const HomePage = ({ data, id }) => {
	const [calories, setCalories] = useState(0);
	const [water, setWater] = useState(0);
	const { data: WeightData } = useGet('/get/weight/' + id, [id]);

	useEffect(() => {
		if (data) {
			setCalories(data[0]?.calories ? data[0]?.calories : 0);
			setWater(data[0]?.water ? data[0]?.water : 0);
		}
	}, [data]);

	const { data: TrainingData, error, loading } = useGet('/get/activity/' + id, [id]);

	const TrainingSpeed = TrainingData && TrainingData.length > 0 && TrainingData[0]?.distance / TrainingData[0]?.time;

	const WeightDataOneExists = WeightData && WeightData.length > 1;
	const WeightLoss = WeightDataOneExists && WeightData[0].weight - WeightData[1].weight;

	const gotFat = WeightLoss > 0 ? `+${WeightLoss}` : WeightLoss;

	const arr = [
		{
			name: 'Heart',
			icon: 'heartbeat',
			data: TrainingData && TrainingData.length > 0 && TrainingData[0]?.heartRate + 'bpm'
		},
		{
			name: 'Distance',
			icon: 'compass',
			data: TrainingData && TrainingData.length > 0 && TrainingData[0].distance + 'km'
		},
		{
			name: 'Speed',
			icon: 'wind',
			data: Math.trunc(TrainingSpeed) + 'km/h'
		}
	];
	return (
		<ScrollView style={{ marginBottom: 50 }}>
			<View style={styles.list}>
				<TrippleTile data={arr} />
				<View style={{ margin: 10, alignItems: 'center' }}>
					<Text style={{ fontSize: 25, color: '#004D73' }}>Last Activity</Text>
					<Bar />
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<ChartTile
						{...{
							title: 'Calories',
							proggress: (calories / 2000) * 100,
							legend: calories + 'kcal',
							color: '#e09422'
						}}
					/>
					<ChartTile
						{...{
							title: 'Water',
							proggress: (water / 3000) * 100,
							legend: water + 'ml',
							color: '#00ACF5'
						}}
					/>
				</View>

				<Tile
					color={'#00C6CF'}
					icon="map-marked-alt"
					legend="last location"
					data="Olsztyn"
					color={['#00974D', '#00866F']}
				/>
				<Tile
					color={'#00C6CF'}
					icon="balance-scale"
					legend="weight tracking"
					data={gotFat ? gotFat + 'kg' : '0kg'}
					color={['#0046BC', '#009BE2']}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	list: {
		alignItems: 'center',
		padding: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		marginTop: 15
	}
});

export default HomePage;
