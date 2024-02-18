import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { fetchExpenses, fetchIncomes } from '../../services/users-service';
import { UserAuth } from '../../context/AuthContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import DashboardChart from './DashboardChart';

interface ExpenseData {
    [date: string]: number;
}

const Test = () => {
    const { user } = UserAuth() ?? {};

    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [chartData, setChartData] = useState<any>([]);
    const [loading, setLoading] = useState(false);


    const balance = totalIncome - totalExpenses;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch expenses data
                setLoading(true);
                const expensesData = await fetchExpenses(user?.userId, user?.authToken);
                let totalExpenses = 0;
                const expensesByDate: ExpenseData = {};

                expensesData?.documents?.forEach((document: any) => {
                    const expense = document.fields;
                    const date = new Date(expense.date.timestampValue).toLocaleDateString();
                    totalExpenses += parseFloat(expense.total.integerValue);

                    if (expensesByDate[date]) {
                        expensesByDate[date] += parseFloat(expense.total.integerValue);
                    } else {
                        expensesByDate[date] = parseFloat(expense.total.integerValue);
                    }
                });

                // Fetch incomes data
                const incomesData = await fetchIncomes(user?.userId, user?.authToken);
                let totalIncome = 0;
                const incomeByDate: ExpenseData = {};

                incomesData?.documents?.forEach((document: any) => {
                    const income = document.fields;
                    const date = new Date(income.date.timestampValue).toLocaleDateString();

                    totalIncome += parseFloat(income.total.integerValue);

                    if (incomeByDate[date]) {
                        incomeByDate[date] += parseFloat(income.total.integerValue);
                    } else {
                        incomeByDate[date] = parseFloat(income.total.integerValue);
                    }
                });
                const dates = Object.keys({ ...expensesByDate, ...incomeByDate }).sort();
                const chartData = dates.map(date => [date, expensesByDate[date] || 0, incomeByDate[date] || 0]);

                setChartData(chartData);
                setTotalExpenses(totalExpenses);
                setTotalIncome(totalIncome);
                setLoading(false);

            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();

    }, [user?.userId, user?.authToken]);


    const sortedChartData = chartData.slice().sort((a, b) => {
        const [dayA, monthA, yearA] = a[0].split('.');
        const [dayB, monthB, yearB] = b[0].split('.');

        const dateA = new Date(Number(yearA), Number(monthA) - 1, Number(dayA));
        const dateB = new Date(Number(yearB), Number(monthB) - 1, Number(dayB));

        return dateA.getTime() - dateB.getTime();
    });

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
        // </>
    )
}

export default Test
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
