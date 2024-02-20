import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { BottomNavigation, IconButton } from 'react-native-paper';
import { UserAuth } from '../../context/AuthContext';
import Categories from '../Categories/Categories';
import Expenses from '../Expenses/Expenses';
import Incomes from '../Incomes/Incomes';
import Dashboard from '../Dashboard/Dashboard';




const BottomNavigationComponent = () => {

	const { logout } = UserAuth();
	const navigation = useNavigation();

	const handleLogout = async () => {
		try {
			await logout();
			navigation.navigate('login', {});
		} catch (error) {
			throw (error);
		}
	};

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'dashboard', title: 'Dashboard', focusedIcon: 'view-dashboard' },
		{ key: 'expenses', title: 'Expenses', focusedIcon: 'cash-multiple' },
		{ key: 'income', title: 'Income', focusedIcon: 'currency-usd' },
		{ key: 'categories', title: 'Categories', focusedIcon: 'format-list-bulleted' },
		{ key: 'logout', title: 'Logout' },
	]);

	const LoginRoute = () => <></>;

	const DashboardRoute = () => <Dashboard />;

	const IncomeRoute = () => <Incomes />;

	const ExpensesRoute = () => <Expenses />;

	const CategoriesRoute = () => <Categories />;

	const renderScene = BottomNavigation.SceneMap({
		dashboard: DashboardRoute,
		income: IncomeRoute,
		expenses: ExpensesRoute,
		categories: CategoriesRoute,
		logout: LoginRoute
	});

	useEffect(() => {

	}, [routes[index].key])

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
