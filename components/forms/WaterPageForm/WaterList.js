import React, { useContext } from 'react';

import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Bar from '../../design/bar';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import * as CONST from '../../../constants/constants';
import { AuthContext } from '../../../context/AuthContext';

const RightAction = () => {
	return (
		<View style={styles.RightActionContainer}>
			<Text style={{ textAlign: 'right', fontSize: 20, padding: 5, color: 'white' }}>Delete</Text>
		</View>
	);
};

export default function WaterList({ list, setTrigger }) {
	const { isAuth } = useContext(AuthContext);
	async function DeleteWater(id) {
		try {
			const res = await fetch(CONST.BACKEND + '/delete/water/' + id, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					token: isAuth.jwt,
					User: isAuth.login
				}
			});
			const data = await res.json();
			if (data != null) {
				setTrigger((trigger) => trigger + 1);
			}
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<ScrollView style={styles.scrollList}>
			<View style={{ alignItems: 'center' }}>
				<Bar />
			</View>
			{list &&
				list.map((el) => {
					const { id, water, date } = el;
					return (
						<Swipeable
							key={id}
							renderRightActions={RightAction}
							onSwipeableRightOpen={() => DeleteWater(id)}
						>
							<TouchableOpacity style={[styles.listEl, { marginLeft: 15 }]} activeOpacity={0.8}>
								<Text
									style={{
										fontSize: 25,
										color: 'white',
										color: water >= 3000 ? '#000CF2' : 'white'
									}}
								>
									{water}ml
								</Text>
								<Text style={{ fontSize: 25, color: 'white' }}>{date}</Text>
							</TouchableOpacity>
						</Swipeable>
					);
				})}
			<View style={{ marginTop: 30 }}></View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	listEl: {
		width: '90%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#009B85',
		padding: 15,
		margin: 5,
		borderRadius: 25
	},
	scrollList: {
		width: '100%',
		flexDirection: 'column',
		borderRadius: 20,
		padding: 20,
		marginBottom: 65
	},
	RightActionContainer: {
		position: 'relative',
		left: 15,
		width: '90%',
		padding: 10,
		borderRadius: 25,
		backgroundColor: '#D93939',
		margin: 5
	}
});
