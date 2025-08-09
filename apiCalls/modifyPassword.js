import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
const API_BASE_URL = 'http://172.20.10.4:3001';

export const modifyPassword = async ({username, newPassword}) => {
  try {
    const jwtToken = await SecureStore.getItemAsync('userToken'); // Récupérer le jeton JWT
    if (!jwtToken) throw new Error('Utilisateur non authentifié');

    const updateResponse = await axios.patch(`${API_BASE_URL}/user/me`, {
      username, 
      password: newPassword,
    },
    {
        headers: {
          Authorization: `Bearer ${jwtToken}`, 
        }
    });
    if (updateResponse.status !== 204) {
      throw new Error('Échec de la mise à jour du mot de passe');
    }

    return { success: true }; 
  } catch (error) {
    throw new Error(error.response?.data || 'Une erreur est survenue');
  }
};
