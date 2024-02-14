import axios from 'axios';

export const addUserToFirestore = async (email: string, name: string, userId: string, authToken: string) => {
    try {
        const firestoreResponse = await axios.post(
            `https://firestore.googleapis.com/v1/projects/fir-tracker-6c099/databases/(default)/documents/users?documentId=${userId}`,
            {
                fields: {
                    email: { stringValue: email },
                    name: { stringValue: name },
                    userId: { stringValue: userId }
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        return firestoreResponse.data;
    } catch (error: any) {
        throw new Error('Error adding user to Firestore: ' + error.message);
    }
};

export const fetchIncomes = async (userId: string, authToken: string) => {
    try {
        const response = await axios.get(
            `https://firestore.googleapis.com/v1/projects/fir-tracker-6c099/databases/(default)/documents/users/${userId}/incomes`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error('Error fetching incomes: ' + error.message);
    }
};

export const addIncome = async (userId: string, authToken: string, incomeData: any) => {
    try {
        const response = await axios.post(
            `https://firestore.googleapis.com/v1/projects/fir-tracker-6c099/databases/(default)/documents/users/${userId}/incomes`,
            {
                fields: {
                    name: { stringValue: incomeData.name },
                    date: { timestampValue: incomeData.date },
                    total: { integerValue: incomeData.total },
                    category: { stringValue: incomeData.category }
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error('Error adding expense: ' + error.message);
    }
}


export const updateIncome = async (userId: string, authToken: string, incomeId: string, updatedIncomeData: any) => {
    try {
        const response = await axios.patch(
            `https://firestore.googleapis.com/v1/projects/fir-tracker-6c099/databases/(default)/documents/users/${userId}/incomes/${incomeId}`,
            {
                fields: {
                    name: { stringValue: updatedIncomeData.name },
                    date: { timestampValue: updatedIncomeData.date },
                    total: { integerValue: updatedIncomeData.total },
                    category: { stringValue: updatedIncomeData.category }
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error('Error adding expense: ' + error.message);
    }
}

export const deleteIncome = async (userId: string, authToken: string, incomeId: string) => {
    try {
        const response = await axios.delete(
            `https://firestore.googleapis.com/v1/projects/fir-tracker-6c099/databases/(default)/documents/users/${userId}/incomes/${incomeId}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error('Error deleting expense: ' + error.message);
    }
}

export const fetchExpenses = async (userId: string, authToken: string) => {
    try {
        const response = await axios.get(
            `https://firestore.googleapis.com/v1/projects/fir-tracker-6c099/databases/(default)/documents/users/${userId}/expenses`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error('Error fetching incomes: ' + error.message);
    }
}

export const addExpense = async (userId: string, authToken: string, expenseData: any) => {
    try {
        const response = await axios.post(
            `https://firestore.googleapis.com/v1/projects/fir-tracker-6c099/databases/(default)/documents/users/${userId}/expenses`,
            {
                fields: {
                    name: { stringValue: expenseData.name },
                    date: { timestampValue: expenseData.date },
                    total: { integerValue: expenseData.total },
                    category: { stringValue: expenseData.category }
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error('Error adding expense: ' + error.message);
    }
}

export const updateExpense = async (userId: string, authToken: string, expenseId: string, updatedExpenseData: any) => {
    try {
        const response = await axios.patch(
            `https://firestore.googleapis.com/v1/projects/fir-tracker-6c099/databases/(default)/documents/users/${userId}/expenses/${expenseId}`,
            {
                fields: {
                    name: { stringValue: updatedExpenseData.name },
                    date: { timestampValue: updatedExpenseData.date },
                    total: { integerValue: updatedExpenseData.total },
                    category: { stringValue: updatedExpenseData.category }
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
        
        return response.data;
    } catch (error: any) {
        throw new Error('Error adding expense: ' + error.message);
    }
}

export const deleteExpense = async (userId: string, authToken: string, expenseId: string) => {
    try {
        const response = await axios.delete(
            `https://firestore.googleapis.com/v1/projects/fir-tracker-6c099/databases/(default)/documents/users/${userId}/expenses/${expenseId}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error('Error deleting expense: ' + error.message);
    }
}