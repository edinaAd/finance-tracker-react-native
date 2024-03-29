import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions, View, Text } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ExpensesChart = ({ chartData }) => {

    const generateRandomColors = (numColors: any) => {
        const colors = [];
        const validHexChars = '0123456789ABCDEF';

        for (let i = 0; i < numColors; i++) {
            let color: any;

            do {
                color = '#';

                for (let j = 0; j < 6; j++) {
                    color += validHexChars[Math.floor(Math.random() * 16)];
                }
            } while (color === '#FFFFFF');

            colors.push(color);
        }

        return colors;
    };

    const colors = generateRandomColors(chartData.length);

    const dataWithColors = chartData.map((entry, index) => ({
        ...entry,
        color: colors[index],
    }));

    const chartConfig = {
        backgroundColor: '#FFF',
        borderRadius: 100,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    };

    return (
        <View style={{ alignItems: 'center', backgroundColor: 'white', marginTop: 10, borderRadius: 10, margin: 16, paddingBottom: 10 }}>
            <PieChart
                data={dataWithColors}
                width={screenWidth - 30}
                height={250}
                chartConfig={chartConfig}
                accessor="value"
                backgroundColor="transparent"
                paddingLeft="5"
                center={[80, 0]}
                absolute
                hasLegend={false}
            />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {dataWithColors.map((entry: any, index: any) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 5 }}>
                        <View style={{ width: 10, height: 10, backgroundColor: entry.color, marginRight: 5, borderRadius: 5 }} />
                        <Text>{`${entry.name}: $${entry.value}`}</Text>
                    </View>
                ))}
            </View>
        </View>

    );
};

export default ExpensesChart;
