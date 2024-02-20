import * as React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import ExpensesContent from './ExpensesContent/ExpensesContent';
import IncomesContent from './IncomesContent/IncomesContent';

const Categories = () => {
	const [value, setValue] = React.useState('expenses');

	const renderSelectedView = () => {
		switch (value) {
			case 'incomes':
				return <IncomesContent />;
			case 'expenses':
				return <ExpensesContent />;
			default:
				return null;
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.mainView}>
				<View style={styles.segmentedButtons}>
					<SegmentedButtons
						value={value}
						style={styles.buttons}
						onValueChange={setValue}
						buttons={[
							{
								value: 'expenses',
								label: 'Expenses',
								style: {
									borderColor: 'white',
									borderRadius: 10,
									borderTopRightRadius: 10,
									borderBottomRightRadius: 10
								}
							},
							{
								value: 'incomes',
								label: 'Incomes',
								style: {
									borderColor: 'white',
									borderRadius: 10,
									marginLeft: 20,
									borderTopLeftRadius: 10,
									borderBottomLeftRadius: 10
								}
							},
						]}
						theme={{ roundness: 2 }}
					/>
				</View>
			</View>
			{renderSelectedView()}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F0F0F0',
		alignItems: 'center',
	},
	mainView: {
		marginTop: 30,
		width: '70%',
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 15,
		marginBottom: 40
	},
	segmentedButtons: {
		display: 'flex',
		alignItems: 'center',
	},
	buttons: {
		backgroundColor: 'white',
		borderColor: 'white',
		overflow: 'hidden',
	},
	selectedView: {
		marginTop: 20,
		padding: 10,
		backgroundColor: '#E0E0E0',
		borderRadius: 10,
		alignItems: 'center',
	},
});

export default Categories;