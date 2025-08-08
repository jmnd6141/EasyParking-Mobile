import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'http://172.20.10.4:3001';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, {
      username,
      password,
    });

    if (response.status === 201) {
        const token = response.data.token; 
       await SecureStore.setItemAsync('userToken', token);
        return { success: true, token }; 
    }
  } catch (error) {
    if (error.response.status === 404) {
        throw new Error("Utilisateur non trouvé. Vérifiez vos identifiants.");
      } else {
        throw new Error(`Erreur serveur (${error.response.status})`);
      }
  }
};

export const getToken = async () => {
  
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (!token) {
        throw new Error('Aucun token trouvé. Veuillez vous connecter.');
      }
      return token;
    } catch (error) {
      throw error;
    }
  };
  
  export const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      return { success: true };
    } catch (error) {
      throw new Error('Erreur lors de la déconnexion.');
    }
  };
