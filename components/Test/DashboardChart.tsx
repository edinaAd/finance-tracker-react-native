import React from 'react';
import { View, Text } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const DashboardChart = ({ chartData }) => {


	const data = {
		labels: chartData.map(([date]) => date),
		datasets: [
			{
				data: chartData.map(([_, expense]) => expense),
				color: () => `#FF0000`,
				strokeWidth: 2,
			},
			{
				data: chartData.map(([_, __, income]) => income),
				color: () => `#129B0F`,
				strokeWidth: 2, 
			},
		],
		legend: ['Expenses', 'Income'],
	};


	return (
		<View style={{ marginTop: 40 }}>
			<LineChart
				data={data}
				width={350}
				height={220}
				yAxisSuffix="$"
				chartConfig={{
					backgroundGradientFrom: '#fff',
					backgroundGradientTo: '#fff',
					decimalPlaces: 0,
					color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
					style: {
						borderRadius: 16,
					},
				}}
				bezier 
			/>
		</View>
	);
};

export default DashboardChart;
