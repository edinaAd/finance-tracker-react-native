import axios from 'axios';

const API_URL = 'https://firestore.googleapis.com/v1/projects/fir-tracker-6c099/databases/(default)/documents';

export const fetchCategories = async (authToken: any) => {
    try {
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        };

        const response = await axios.get(`${API_URL}/categories`, axiosConfig);
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