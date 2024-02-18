import React, { useEffect, useState } from 'react'
import { Text, Button, IconButton } from 'react-native-paper';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { UserAuth } from '../../context/AuthContext';
import { deleteExpense, fetchExpenses } from '../../services/users-service';
import ExpensesChart from './ExpensesChart';
import AddExpense from './AddExpense';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Expenses = () => {
	const { user } = UserAuth();

	const [open, setOpen] = useState(false);
	const [expenses, setExpenses] = useState<any[]>([]);
	const [chartData, setChartData] = useState<{ name: string, value: number }[]>([]);
	const [editExpense, setEditExpense] = useState(null);
	const [expensesLoading, setExpensesLoading] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleEditExpense = (expense: any) => {
		setEditExpense(expense);
		setOpen(true);
	};

	const calculateChartData = (expenses: any[]) => {
		const chartObj: any = {};
		expenses.forEach(expense => {
			const category = expense.category;
			const total = parseFloat(expense.total);
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
		if (response.fields) {
			const expense = response.fields;
			const total = parseFloat(expense.total.integerValue);
			const updatedObj = {
				docId: response.name.split("/").pop(),
				name: expense?.name?.stringValue,
				date: expense?.date?.timestampValue,
				total,
				category: expense?.category?.stringValue
			};

			const index = expenses.findIndex(x => x.docId === updatedObj.docId);
			if (index > -1) {
				expenses[index] = updatedObj;
			} else {
				expenses.unshift(updatedObj)
			}

			const updatedChartData = calculateChartData(expenses);
			setChartData(updatedChartData);

		}
		setOpen(false);
		setEditExpense(null);
	};

	useEffect(() => {
		const fetchUserExpenses = async () => {
			try {

				setExpensesLoading(true);
				let expensesData = await fetchExpenses(user?.userId, user?.authToken);
				let chartObj: any = {};

				if (expensesData && expensesData.documents && Array.isArray(expensesData.documents)) {
					expensesData = expensesData.documents && expensesData.documents.map((document: any) => {
						const expense = document.fields;
						const category = expense.category.stringValue;
						const total = parseFloat(expense.total.integerValue);

						if (chartObj[category]) chartObj[category] += total
						else chartObj[category] = total;
						return {
							docId: document.name.split("/").pop(),
							name: expense?.name?.stringValue,
							date: expense?.date?.timestampValue,
							total,
							category: expense?.category?.stringValue
						};
					})
					setExpensesLoading(false);
				} else {
					setExpensesLoading(false);
					expensesData = [];
				}

				setExpenses(expensesData);
				setChartData(
					Object.entries(chartObj).map(([key, value]) => {
						return {
							name: key,
							value
						} as { name: string, value: number }
					})
				);
			} catch (error: any) {
				console.log(error);
				console.error('Error fetching expenses:', error.message);
			}
		};


		fetchUserExpenses();
	}, [user?.userId, user?.authToken]);

	const handleDeleteExpense = async (expenseId: string) => {
		try {
			await deleteExpense(user.userId, user.authToken, expenseId);
			// Update expense state after deletion
			setExpenses(prevExpenses => prevExpenses.filter(expense => expense.docId !== expenseId));

			// Update chartData state after deletion
			const updatedChartData = expenses.filter(expense => expense.docId !== expenseId)
				.reduce((chartObj: { [key: string]: number }, expense: any) => {
					const category = expense.category;
					const total = expense.total;
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
			console.error('Error deleting expense:', error.message);
		}
	};

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
					onPress={() => handleEditExpense(item)}
				/>
				<TouchableOpacity>
					<IconButton
						icon="delete"
						size={20}
						onPress={() => handleDeleteExpense(item.docId)}
					/>
				</TouchableOpacity>
			</View>
		</View>

	);

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
						data={expenses}
						renderItem={renderItem}
						keyExtractor={(item: any) => item.docId}
						initialNumToRender={4}
						windowSize={4}
						showsVerticalScrollIndicator={true}
					/>
				</View>
				{expensesLoading ? (
					// Show loader while data is being fetched
					<View>
						<LoadingSpinner />
					</View>
				) : (
					// Show chart or no data message based on chartData length
					<View>
						{chartData.length > 0 ? (
							<ExpensesChart chartData={chartData} />
						) : (
							<View style={styles.noDataContainer}>
								<Text style={styles.noDataText}>Oops! Something went wrong while fetching expenses. Why not try adding some expenses and see the charts?</Text>
							</View>
						)}
					</View>

				)}
			</View>
			{open && (
				<View style={styles.modalContainer}>
					<AddExpense open={open} editExpense={editExpense} onClose={handleClose} />
				</View>
			)}
		</>
	);
}

export default Expenses;

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

	noDataContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 30
	},
	
	noDataText: {
		fontSize: 16,
		color: 'black',
		fontWeight: 'bold',
		fontStyle: 'italic',
		textAlign: 'center',
		marginTop: 20,
	},
});