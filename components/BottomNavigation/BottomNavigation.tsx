import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text, Icon, IconButton } from 'react-native-paper';
import { UserAuth } from '../../context/AuthContext';
import Dashboard from '../Dashboard/Dashboard';
import Incomes from '../Incomes/Incomes';
import Login from '../Login/Login';
import Test from '../Test/Test';


const LoginRoute = () => <></>;

const DashboardRoute = () => <Test />;

const IncomeRoute = () => <Incomes />;

const ExpensesRoute = () => <Text>Expenses</Text>;

const CategoriesRoute = () => <Text>Categories</Text>;


const BottomNavigationComponent = () => {
	const { logout } = UserAuth();
	const navigation = useNavigation();

	
	const handleLogout = async () => {
		try {
			await logout();
			navigation.navigate('login');
		} catch (error) {
			throw (error);
		}
	};
	
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'dashboard', title: 'Dashboard', focusedIcon: 'view-dashboard' },
		{ key: 'income', title: 'Income', focusedIcon: 'currency-usd' },
		{ key: 'expenses', title: 'Expenses', focusedIcon: 'cash-multiple' },
		{ key: 'categories', title: 'Categories', focusedIcon: 'format-list-bulleted' },
		{ key: 'logout', title: 'Logout' },
	]);

	const renderScene = BottomNavigation.SceneMap({
		dashboard: DashboardRoute,
		income: IncomeRoute,
		expenses: ExpensesRoute,
		categories: CategoriesRoute,
		logout: LoginRoute
	});


	return (
		<View style={{ flex: 1 }}>
		<View style={{ flex: 1 }}>
			<BottomNavigation
				navigationState={{ index, routes }}
				onIndexChange={setIndex}
				renderScene={renderScene}
			/>
		</View>
		<View style={{ position: 'absolute', bottom: 60, right: 10 }}>
			<IconButton
				icon="logout"
				onPress={handleLogout}
				style={{ marginRight: 10 }}
			/>
		</View>
	</View>
	);
}

export default BottomNavigationComponent;
