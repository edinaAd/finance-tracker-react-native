import React from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const DashboardChart = () => {
  // Dummy data for expenses and incomes
  
  const data = {
    labels: ['12/07', '12/08', '12/09', '12/10', '12/11', '12/12'], // Sample dates
    datasets: [
      { date: '12/07', expenses: [300], incomes: [400] },
      { date: '12/08', expenses: [350], incomes: [300] },
      { date: '12/09', expenses: [280], incomes: [450] },
      { date: '12/10', expenses: [450], incomes: [500] },
      { date: '12/11', expenses: [300], incomes: [350] },
      { date: '12/12', expenses: [500], incomes: [600] },
    ],
  };

  return (
    <View style={{ marginTop: 40 }}>
      <BarChart
        data={{
          labels: data.labels,
          datasets: [
            {
              data: data.datasets.map(item => item.incomes[0]), // Adjusted expenses data mapping
              color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`, // Red color for expenses
            },
          ],
        }}
        width={screenWidth}
        height={280}
        yAxisSuffix=""

        yAxisLabel="$"
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0, // No decimal places for currency
          color: (opacity = 1) => `blue`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          barPercentage: 0.7, // Adjust bar width here (0.5 means 50% of available space)

        }}
        verticalLabelRotation={50}
      />
    </View>
    // <Text >
    //     Edina
    // </Text>
  );
};

export default DashboardChart;
