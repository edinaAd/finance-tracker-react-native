import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import DashboardChart from './DashboardChart';
import useIncomeExpensesData from './useIncomeExpensesData';

const Dashboard = () => {
    const { totalExpenses, totalIncome, loading, chartData } = useIncomeExpensesData();

    const balance = totalIncome - totalExpenses;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.dashboard}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <View style={styles.totalIncome}>
                            <Text style={styles.amountColorIncome}>+ ${totalIncome}</Text>
                            <Text style={styles.text}>Income</Text>
                        </View>
                    </View>
                    <View style={styles.column}>
                        <View style={styles.totalIncome}>
                            <Text style={styles.amountColorExpense}>- ${totalExpenses}</Text>
                            <Text style={styles.text}>Expenses</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.fullWidth}>
                        <View style={styles.balance}>
                            <Text style={styles.amountColorBalance}>${balance}</Text>
                            <Text style={styles.text}>Balance</Text>
                        </View>
                    </View>
                </View>
                {loading ? (
                    // Show loader while data is being fetched
                    <View>
                        <LoadingSpinner />
                    </View>
                ) : (
                    // Show chart or no data message based on chartData length
                    <View>
                        {chartData.length > 0 ? (
                            <DashboardChart chartData={chartData} />
                        ) : (
                            <View style={styles.noDataContainer}>
                                <Text style={styles.noDataText}>No expense or income data found!</Text>
                            </View>
                        )}
                    </View>

                )}
            </View>
        </SafeAreaView>
    )
}

export default React.memo(Dashboard);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    dashboard: {
        paddingHorizontal: 20,
        paddingVertical: 90,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'center',
        gap: 20,
    },
    column: {
        flex: 1,
    },
    fullWidth: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    totalIncome: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    balance: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    amountColorIncome: {
        fontWeight: 'bold',
        color: '#129B0F',
        textAlign: 'center',
    },
    amountColorExpense: {
        fontWeight: 'bold',
        color: '#FF0000',
        textAlign: 'center',
    },
    amountColorBalance: {
        fontWeight: 'bold',
        color: '#6469F0',
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',
    },
    noDataContainer: {
        alignItems: 'center',
        justifyContent: 'center',
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
