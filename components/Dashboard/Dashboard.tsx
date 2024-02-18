import React from 'react'
import { SafeAreaView, StyleSheet } from "react-native";
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
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
	}
})