import { Modal, Portal, Text, Button, PaperProvider, Dialog, Tooltip, TextInput } from 'react-native-paper';
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react';
import { fetchCategories } from '../../api/api-categories';
import { addExpense, updateExpense } from '../../api/api-users';
import { UserAuth } from '../../context/AuthContext';
import { categoryIcons } from '../../services/service';

const AddExpense = ({ open, editExpense, onClose }: any) => {
    const { user } = UserAuth();
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        selectedCategory: editExpense ? editExpense.category : '',
        name: editExpense ? editExpense.name : '',
        total: editExpense ? editExpense.total : ''
    });

    const handleNameChange = (text: string) => {
        setFormData({ ...formData, name: text })
    };

    const handleTotalChange = (text: string) => {
        setFormData({ ...formData, total: text })
    };


    const [buttonClicked, setButtonClicked] = useState(false);

    const handleCategorySelect = (categoryName: string) => {
        setFormData({ ...formData, selectedCategory: categoryName });
    };

    const handleAddExpense = async () => {
        setButtonClicked(true);
        try {
            if (!formData.selectedCategory || !formData.name || !formData.total) {
                return;
            }

            const expenseData = {
                name: formData.name,
                date: new Date().toISOString(),
                total: parseFloat(formData.total),
                category: formData.selectedCategory
            };

            let response;
            if (editExpense) {
                // Update existing expense
                response = await updateExpense(user.userId, user.authToken, editExpense.docId, expenseData);
            } else {
                // Add new expense
                response = await addExpense(user.userId, user.authToken, expenseData);
            }

            onClose(response);
        } catch (error: any) {
            console.error('Error adding expense:', error.message);
        }
    };

    useEffect(() => {
        if (!user?.authToken) {
            console.error('Authentication token not found.');
            return;
        }

        fetchCategories(user.authToken)
            .then((categoriesData: any) => {
                const expenseCategories = categoriesData.filter((category: any) => category.type === 'expenses');

                setCategories(expenseCategories);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    useEffect(() => {
        if (open && editExpense) {
            setFormData({
                ...formData,
                selectedCategory: editExpense.category || '',
                name: editExpense.name || '',
                total: editExpense.total.toString() || ''
            });
        } else {
            setFormData({ ...formData, selectedCategory: '', name: '', total: '' });
        }
    }, [open, editExpense]);

    return (
        <PaperProvider>
            <View>
                <Portal>
                    <Dialog style={{ backgroundColor: 'white' }} visible={open} onDismiss={() => console.log('closed')}>
                        <Dialog.Title style={styles.expenseTitle}>Add Expense</Dialog.Title>
                        <Dialog.Content>
                            <View>
                                <View>
                                    <Text style={styles.title}>Choose Category:</Text>
                                </View>
                                <View style={styles.container}>
                                    {categories.map((category, index) => (
                                        <TouchableOpacity style={{ width: 50 }} key={index} onPress={() => handleCategorySelect(category.name)}>
                                            <View style={[styles.categoryDiv, formData.selectedCategory === category.name && styles.selectedCategoryDiv]}>
                                                <Tooltip title={category.name} >
                                                    {categoryIcons[category.name]}
                                                </Tooltip>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <View>
                                    <Text style={styles.title}>Write a Note:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            label={formData.name === '' ? "Text here..." : ''}
                                            value={formData.name}
                                            onChangeText={handleNameChange}
                                            style={styles.input}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.title}>Add Amount:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            label={formData.total === '' ? "$140.55" : ''}
                                            value={formData.total}
                                            onChangeText={handleTotalChange}
                                            style={styles.input}
                                        />
                                    </View>
                                </View>
                            </View>
                            {buttonClicked && (!formData.selectedCategory || !formData.name || !formData.total) && (
                                <Text style={styles.errorMessage}>All Fields Are Required!</Text>
                            )}
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button textColor='white' style={styles.cancelButton} onPress={onClose}>CANCEL</Button>
                            {!editExpense ?
                                <Button textColor='white' style={styles.addButton} onPress={handleAddExpense}>ADD EXPENSE</Button>
                                :
                                <Button textColor='white' style={styles.addButton} onPress={handleAddExpense}>EDIT EXPENSE</Button>
                            }
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </PaperProvider>
    )
}

export default AddExpense;

const styles = StyleSheet.create({
    expenseTitle: {
        display: 'flex',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingBottom: 10

    },
    categoryDiv: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        backgroundColor: '#f0f0f0',
    },
    selectedCategoryDiv: {
        borderWidth: 1,
        borderColor: 'black',
    },
    title: {
        fontWeight: 'bold'
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'lightgray',
        backgroundColor: 'white',
        borderRadius: 5,
        height: 40,
        padding: 0
    },

    cancelButton: {
        backgroundColor: '#D9D9D9',
        fontWeight: 'bold',
        borderRadius: 10
    },

    addButton: {
        backgroundColor: '#D94297',
        fontWeight: 'bold',
        borderRadius: 10
    },

    errorMessage: {
        display: 'flex',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'red',
    }

});