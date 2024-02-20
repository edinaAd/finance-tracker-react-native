import React from 'react'
import { SafeAreaView, StyleSheet } from "react-native";
import BottomNavigationComponent from '../BottomNavigation/BottomNavigation';

const MainView = () => {
	return (
		<>
			<SafeAreaView style={styles.container}>
			</SafeAreaView>
			<BottomNavigationComponent />
		</>
	)
}

export default MainView;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
	}
})