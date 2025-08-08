import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
const API_BASE_URL = 'http://172.20.10.4:3001';

export const getAllParkings = async (search = '') => {
  try {
     const token = await SecureStore.getItemAsync('userToken');
    if (!token) throw new Error('Token non disponible');
    
    const response = await axios.get(`${API_BASE_URL}/parking/all?search=${encodeURIComponent(search)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Erreur lors de la récupération des parkings');
    }
  } catch (error) {
    throw error;
  }
};
