import axios from 'axios';

const BASE_URL = process.env.REACT_APP_FIRESTORE_BASE_URL;

export const fetchCategories = async (authToken: any) => {
    try {
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        };

        const response = await axios.get(`${BASE_URL}/categories`, axiosConfig);
        return response.data.documents.map((doc: any) => ({
            id: doc.name.split('/').pop(),
            name: doc.fields.name.stringValue,
            type: doc.fields.type.stringValue,
        }));
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};