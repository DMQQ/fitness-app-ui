import React, { useContext, useEffect, useState } from 'react';

import { View, Text, ScrollView, Alert, Keyboard } from 'react-native';
import Input from '../../components/forms/input';
import { styles } from './styles';
import * as CONSTS from '../../constants/constants';
import { AuthContext } from '../../context/AuthContext';

import CustomBtn from '../../components/buttons/CustomBtn';
import Bar from '../../components/design/bar';
import WeightChart from './WeightChart';
import WeightListItem from './WeightListItem';

export default function Weight() {
	const [weight, setWeight] = useState('');
	const [error, setError] = useState('');
	const [list, setList] = useState([]);
	const [refresh, setRefresh] = useState(0);

	const { isAuth } = useContext(AuthContext);

	const AddWeight = async () => {
		if (!weight) return setError('Fill the form!!');
		if (!isAuth) return setError('No user provided, log in again');
		if (+weight === 0 || +weight > 1000) return setError('Enter valid weight');

		await fetch(CONSTS.BACKEND + '/weight', {
			method: 'POST',
			body: JSON.stringify({
				weight: +weight,
				user_id: isAuth.id
			}),
			headers: {
				'Content-Type': 'application/json',
				User: isAuth.login,
				token: isAuth.jwt
			}
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (data != null) {
					setWeight('');
					return Keyboard.dismiss();
				}
			})
			.catch((err) => {
				console.log(err);
				setError('Something went wrong during Adding weight');
				Keyboard.dismiss();
			})
			.finally(() => {
				setRefresh(refresh + 1);
				setError('');
			});
	};

	useEffect(() => {
		async function FetchStats() {
			await fetch(CONSTS.BACKEND + '/get/weight/' + isAuth.id, {
				method: 'GET',
				headers: {
					token: isAuth.jwt,
					User: isAuth.login
				}
			})
				.then((res) => {
					if (!res.ok) Alert.alert('Error', 'Something went wrong:<');
					return res.json();
				})
				.then((data) => {
					if (data) {
						setList(data);
					}
				});
		}
		FetchStats();
	}, [refresh]);

	useEffect(() => {
		if (weight && weight.trim() !== '') {
			setError('');
		}
	}, [weight]);

	const ArrayOfValues = list && list.length > 0 && list.map((el) => el.weight).reverse();
	const ArrayOfDates = list && list.length > 0 && list.map((el) => el.post_date).reverse();

	const isArrayOfValues = ArrayOfValues ? ArrayOfValues : [100, 200];
	const isArrayOfDates = ArrayOfDates ? ArrayOfDates : ['Error', 'Error'];

	async function onSwipeDelete(id) {
		try {
			const res = await fetch(CONSTS.BACKEND + '/delete/weight/' + id, {
				method: 'DELETE',
				headers: {
					token: isAuth.jwt,
					User: isAuth.login
				}
			});
			const data = await res.json();
			if (data !== null) {
				setRefresh(refresh + 1);
			}
		} catch (error) {
			Alert.alert('Error', error);
		}
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.title}>Weight</Text>
				<Bar />
				<View style={styles.form}>
					<Text
						style={[
							{ textAlign: 'center', fontSize: 22, padding: 5 },
							{ color: error ? '#E33838' : '#000' }
						]}
					>
						{error ? error : "What's your todays weight?"}
					</Text>
					<Input
						val={weight}
						setVal={setWeight}
						more={{ placeholder: 'Weight', style: { margin: 10 } }}
						error={error}
					/>

					<CustomBtn title="Add Weight" func={AddWeight} />
				</View>
				<View
					style={{
						width: '100%',
						padding: 20,
						marginBottom: 50
					}}
				>
					{list && list.length > 1 && <WeightChart values={isArrayOfValues} labels={isArrayOfDates} />}
					{list.length <= 0 && (
						<Text style={{ textAlign: 'center', fontSize: 25 }}>Hey, Add some value :D</Text>
					)}

					{list &&
						list.map((el, index) => (
							<WeightListItem
								index={index}
								el={el}
								list={list}
								key={el.id}
								onSwipeDelete={onSwipeDelete}
							/>
						))}
				</View>
			</View>
		</ScrollView>
	);
}
