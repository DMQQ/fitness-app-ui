import React from 'react';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { View, Text, StyleSheet, Alert } from 'react-native';

const RightAction = () => {
	return (
		<View style={styles.RightActionContainer}>
			<Text style={styles.RightActionText}>Delete</Text>
		</View>
	);
};

export default function WeightListItem({ list, index, el, onSwipeDelete }) {
	const lastValue = list[index + 1]?.weight;
	const differenceBetweenWeights = lastValue === 'undefined' ? 0 : el.weight - lastValue;
	const result = differenceBetweenWeights < 0 ? differenceBetweenWeights : '+' + differenceBetweenWeights;

	const resultColor = result > 0 ? '#FF4949' : '#03F642';
	return (
		<Swipeable key={el.id} renderRightActions={RightAction} onSwipeableRightOpen={() => onSwipeDelete(el.id)}>
			<View style={styles.weightList}>
				<Text style={styles.listText}>{el.weight} kg</Text>
				<Text style={styles.listText}>{el.post_date}</Text>
				<Text
					style={[
						styles.listText,
						{ backgroundColor: resultColor, borderRadius: 10, paddingLeft: 5, paddingRight: 5 }
					]}
				>
					{result === '+NaN' ? '0' : result + 'kg'}
				</Text>
			</View>
		</Swipeable>
	);
}

const styles = StyleSheet.create({
	RightActionContainer: {
		borderRadius: 20,
		backgroundColor: '#D93939',
		width: '100%',
		marginBottom: 10
	},
	RightActionText: {
		textAlign: 'right',
		padding: 15,
		color: '#fff',
		fontSize: 20
	},
	listText: {
		fontSize: 20,
		color: '#ffffff'
	},
	weightList: {
		width: '100%',
		marginBottom: 10,
		padding: 15,
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: '#009B85',
		borderRadius: 20
	}
});
