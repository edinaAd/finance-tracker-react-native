import React from 'react'
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import DashboardChart from './DashboardChart';

const Test = () => {
    const totalIncome = 10;
    const totalExpenses = 20;
    const balance = 30;
    return (
        <SafeAreaView>
            <View style={styles.container}>
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
                <View>
                    <DashboardChart />
                </View>
            </View>
        </SafeAreaView>
        // </>
    )
}

export default Test
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 90,
        backgroundColor: '#F0F0F0'
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
        alignItems: 'center', // Aligns items along the cross axis (horizontally)
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
});
