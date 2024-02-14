import React from 'react'
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { BottomNavigation, BottomNavigationRoute } from 'react-native-paper';
import BottomNavigationComponent from '../BottomNavigation/BottomNavigation';


const Dashboard = () => {

	return (
		<>
			<SafeAreaView style={styles.container}>
			</SafeAreaView>
			<BottomNavigationComponent />
		</>
	)
}

export default Dashboard
const styles = StyleSheet.create({
	container: {
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
		backgroundColor: "#F0F0F0"
	}
})