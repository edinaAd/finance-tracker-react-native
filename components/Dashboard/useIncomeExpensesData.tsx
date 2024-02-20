import { useEffect, useState } from 'react';
import { fetchExpenses, fetchIncomes } from '../../services/users-service';
import { UserAuth } from '../../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';

interface ExpenseData {
    [date: string]: number;
}

const useIncomeExpensesData = () => {
    const { user } = UserAuth() ?? {};
    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState<any>([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch expenses data
                const expensesData = await fetchExpenses(user?.userId, user?.authToken);
                const expensesByDate: ExpenseData = {};
                let totalExpenses = 0;

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
                const incomeByDate: ExpenseData = {};
                let totalIncome = 0;

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
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.userId, user?.authToken, isFocused]);

    return { totalExpenses, totalIncome, loading, chartData };
};

export default useIncomeExpensesData;
