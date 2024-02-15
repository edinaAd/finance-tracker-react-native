import React, { useEffect, useState } from 'react'
import { BottomNavigation, Text, Icon, Button, IconButton } from 'react-native-paper';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import IncomesChart from './IncomesChart';
import { UserAuth } from '../../context/AuthContext';
import { deleteIncome, fetchIncomes } from '../../api/api-users';
import AddIncome from './AddIncome';

const Incomes = () => {
	const { user } = UserAuth();

	const [open, setOpen] = useState(false);
	const [incomes, setIncomes] = useState<any[]>([]);
	const [chartData, setChartData] = useState<{ name: string, value: number }[]>([]);
	const [editIncome, setEditIncome] = useState(null);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleEditIncome = (income: any) => {
		setEditIncome(income);
		setOpen(true);
	};

	const calculateChartData = (incomes: any[]) => {
		const chartObj: any = {};
		incomes.forEach(income => {
			const category = income.category;
			const total = parseFloat(income.total);
			if (chartObj[category]) {
				chartObj[category] += total;
			} else {
				chartObj[category] = total;
			}
		});

		const updatedChartData = Object.entries(chartObj).map(([key, value]) => {
			return {
				name: key,
				value: value as number
			};
		});

		return updatedChartData;
	};


	const handleClose = (response: any | null) => {
		console.log(response);
		if (response.fields) {
			const income = response.fields;
			const total = parseFloat(income.total.integerValue);
			const updatedObj = {
				docId: response.name.split("/").pop(),
				name: income?.name?.stringValue,
				date: income?.date?.timestampValue,
				total,
				category: income?.category?.stringValue
			};
			const index = incomes.findIndex(x => x.docId === updatedObj.docId);
			console.log(index);
			if (index > -1) {
				incomes[index] = updatedObj;
			} else {
				incomes.unshift(updatedObj)
			}

			const updatedChartData = calculateChartData(incomes);
			setChartData(updatedChartData);

		}
		setOpen(false);
		setEditIncome(null);
	};

	useEffect(() => {
		const fetchUserIncomes = async () => {
			try {

				let incomesData = await fetchIncomes(user?.userId, user?.authToken);
				console.log(incomesData)
				let chartObj: any = {};
				incomesData = incomesData.documents.map((document: any) => {
					const income = document.fields;
					const category = income.category.stringValue;
					const total = parseFloat(income.total.integerValue);

					if (chartObj[category]) chartObj[category] += total
					else chartObj[category] = total;
					return {
						docId: document.name.split("/").pop(),
						name: income?.name?.stringValue,
						date: income?.date?.timestampValue,
						total,
						category: income?.category?.stringValue
					};
				})

				setIncomes(incomesData);
				setChartData(
					Object.entries(chartObj).map(([key, value]) => {
						return {
							name: key,
							value
						} as { name: string, value: number }
					}));
			} catch (error: any) {
				console.log(error);
				console.error('Error fetching incomes:', error.message);
			}
		};


		fetchUserIncomes();
	}, [user?.userId, user?.authToken]);

	const handleDeleteIncome = async (incomeId: string) => {
		try {
			await deleteIncome(user.userId, user.authToken, incomeId);
			// Update incomes state after deletion
			setIncomes(prevIncomes => prevIncomes.filter(income => income.docId !== incomeId));

			// Update chartData state after deletion
			const updatedChartData = incomes.filter(income => income.docId !== incomeId)
				.reduce((chartObj: { [key: string]: number }, income: any) => {
					const category = income.category;
					const total = income.total;
					chartObj[category] = (chartObj[category] || 0) + total;
					return chartObj;
				}, {});

			setChartData(Object.entries(updatedChartData).map(([key, value]) => {
				return {
					name: key,
					value: value as number
				};
			}));

		} catch (error: any) {
			console.error('Error deleting income:', error.message);
		}
	};

	const closeIncome = () => {
		setOpen(false);
	}

	const renderItem = ({ item, index }: any) => (
		<View key={index} style={styles.item}>
			<View style={styles.info}>
				<Text style={styles.dateTime}>{item.date.split("T")[0]} - </Text>
				<Text style={styles.category}>{item.category}</Text>
			</View>
			<View style={styles.infoContainer}>
				<Text style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{item.name} </Text>
				<Text> ${item.total}</Text>
			</View>
			<View style={styles.actionContainer}>
				<IconButton
					icon="pencil"
					size={20}
					onPress={() => handleEditIncome(item)}
				/>
				<TouchableOpacity>
					<IconButton
						icon="delete"
						size={20}
						onPress={() => handleDeleteIncome(item.docId)}
					/>
				</TouchableOpacity>
			</View>
		</View>

	);

	console.log("open", open)
	return (

		<>
			<View style={styles.container}>
				<View style={styles.buttonContainer}>
					<Button onPress={handleClickOpen} textColor="white" labelStyle={{ fontWeight: 'bold' }} style={styles.button}>
						Add New
					</Button>
				</View>
				<View style={styles.scrollableView}>
					<FlatList
						data={incomes}
						renderItem={renderItem}
						keyExtractor={(item: any) => item.docId}
						initialNumToRender={4}
						windowSize={4}
						showsVerticalScrollIndicator={true}
					/>
				</View>
				<View style={styles.chartContainer}>
					<IncomesChart chartData={chartData} />
				</View>
			</View>
			{open && (
				<View style={styles.modalContainer}>
					<AddIncome open={open} editIncome={editIncome} onClose={handleClose} />
				</View>
			)}
		</>
	);
}

export default Incomes;

const styles = StyleSheet.create({
	modalContainer: {
		position: 'absolute',
		zIndex: 9999,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	scrollableView: {
		height: 250,
		overflow: 'scroll'
	},

	container: {
		backgroundColor: '#F0F0F0',
		flex: 1,
	},

	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		marginBottom: 10,
		display: 'flex',
		justifyContent: 'center',
	},

	button: {
		width: '40%',
		backgroundColor: '#D94297',
		borderRadius: 5,
		padding: 2,
		marginTop: 20,
	},

	chartContainer: {
		marginTop: 25,
	},

	item: {
		backgroundColor: 'white',
		padding: 10,
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 8,
		elevation: 3,
	},

	category: {
		fontWeight: 'bold',
	},

	infoContainer: {
		flexDirection: 'row',
	},

	info: {
		flexDirection: 'row',
		marginBottom: 15
	},

	total: {
		flex: 1,
	},

	name: {
		flex: 2,
		marginLeft: 10,
	},

	actionContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: -45
	},

	dateTime: {
		fontStyle: 'italic'
	},
});