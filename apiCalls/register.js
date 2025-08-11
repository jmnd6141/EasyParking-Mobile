import axios from 'axios';
import dayjs from 'dayjs';
import { API_BASE_URL } from '../config';

export const register = async ({ firstname, lastname, username, password, dateOfBirth }) => {
    
        const formatDate = (dateOfBirth) => dayjs(dateOfBirth).format('YYYY-MM-DD');
  try {
    const response = await axios.post(`${API_BASE_URL}/user/registration`, {
        name: lastname,
        firstname : firstname,
        date_of_birth: formatDate(dateOfBirth),
        username : username,
        password : password,
        isAdmin: false,
    });

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throw new Error( "Erreur d'inscription");
  }
};
