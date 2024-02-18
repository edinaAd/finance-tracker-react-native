import { Portal, Text, Button, PaperProvider, Dialog, Tooltip, TextInput } from 'react-native-paper';
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react';
import { addIncome, updateIncome } from '../../services/users-service';
import { UserAuth } from '../../context/AuthContext';
import { categoryIcons } from '../../services/service';
import React from 'react';
import { fetchCategories } from '../../services/categories-service';

const AddIncome = React.memo(({ open, editIncome, onClose }: any) => {
    const { user } = UserAuth();
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        selectedCategory: editIncome ? editIncome.category : '',
        name: editIncome ? editIncome.name : '',
        total: editIncome ? editIncome.total : ''
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

    const handleAddIncome = async () => {
        setButtonClicked(true);
        try {
            if (!formData.selectedCategory || !formData.name || !formData.total) {
                return;
            }

            const incomeData = {
                name: formData.name,
                date: new Date().toISOString(),
                total: parseFloat(formData.total),
                category: formData.selectedCategory
            };

            let response;
            if (editIncome) {
                // Update existing income
                response = await updateIncome(user.userId, user.authToken, editIncome.docId, incomeData);
            } else {
                // Add new income
                response = await addIncome(user.userId, user.authToken, incomeData);
            }

            onClose(response);
        } catch (error: any) {
            console.error('Error adding income:', error.message);
        }
    };

    useEffect(() => {
        if (!user?.authToken) {
            console.error('Authentication token not found.');
            return;
        }

        fetchCategories(user.authToken)
            .then((categoriesData: any) => {
                const incomeCategories = categoriesData.filter((category: any) => category.type === 'incomes');

                console.log(categoriesData)
                setCategories(incomeCategories);
                console.log('Income Categories:', incomeCategories);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    useEffect(() => {
        if (open && editIncome) {
            setFormData({
                ...formData,
                selectedCategory: editIncome.category || '',
                name: editIncome.name || '',
                total: editIncome.total.toString() || ''
            });
        } else {
            setFormData({ ...formData, selectedCategory: '', name: '', total: '' });
        }
    }, [open, editIncome]);

    return (
        <PaperProvider>
            <View>
                <Portal>
                    <Dialog style={{ backgroundColor: 'white' }} visible={open} onDismiss={() => console.log('closed')}>
                        <Dialog.Title style={styles.incomeTitle}>Add Income</Dialog.Title>
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
                                            value={formData.total.toString()}
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
                            {!editIncome ?
                                <Button textColor='white' style={styles.addButton} onPress={handleAddIncome}>ADD INCOME</Button>
                                :
                                <Button textColor='white' style={styles.addButton} onPress={handleAddIncome}>EDIT INCOME</Button>
                            }
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </PaperProvider>
    )
})

export default AddIncome
const styles = StyleSheet.create({
    incomeTitle: {
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