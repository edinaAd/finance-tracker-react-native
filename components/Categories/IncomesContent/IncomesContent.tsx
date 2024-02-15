import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper';
import { View, StyleSheet, ScrollView } from 'react-native';
import { UserAuth } from '../../../context/AuthContext';
import { fetchCategories } from '../../../api/api-categories';
import { categoryIcons } from '../../../services/service';


const IncomesContent = () => {

    const { user } = UserAuth();

    const [categories, setCategories] = useState([]);

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
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.categoriesWrapper}>
                {categories.map((category, index) => (
                    <View key={category.docId} style={styles.categoryItem}>
                        <View style={styles.categoryDiv}>
                            {categoryIcons[category.name]}
                        </View>
                        <Text style={styles.categoryName}>
                            {category.name}
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default IncomesContent

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 20,
    },

    categoriesWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 2
    },

    categoryItem: {
        alignItems: 'center',
        margin: 10,
    },

    categoryName: {
        marginTop: 5,
        textAlign: 'center',
    },

    categoryDiv: {
        width: 55,
        height: 55,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        backgroundColor: '#f0f0f0',
    },

})