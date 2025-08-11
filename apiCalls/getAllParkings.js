import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '../config';

export const getAllParkings = async (search = '') => {
  const token = await SecureStore.getItemAsync('userToken');
  if (!token) throw new Error('Token non disponible');

  const response = await axios.get(
    `${API_BASE_URL}/parking/all?search=${encodeURIComponent(search)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (response.status === 200) return response.data;
  throw new Error('Erreur lors de la récupération des parkings');
};

// GET /parking/:parking_id
export const getParkingID = async (parking_id) => {
  const token = await SecureStore.getItemAsync('userToken');
  if (!token) throw new Error('Token non disponible');

  const response = await axios.get(
    `${API_BASE_URL}/parking/${parking_id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (response.status === 200) return response.data;
  throw new Error("Erreur lors de la récupération du parking");
};

// PATCH /parking/   body: { parking_id, places }
export const updateParking = async ({ parking_id, places }) => {
  const token = await SecureStore.getItemAsync('userToken');
  if (!token) throw new Error('Token non disponible');

  // on force les types propres pour éviter un 400 bête
  const payload = { parking_id: Number(parking_id), places: Number(places) };

  const response = await axios.patch(
    `${API_BASE_URL}/parking/`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      // Au cas où le serveur renvoie 204 No Content
      validateStatus: () => true,
    }
  );

  if (response.status >= 200 && response.status < 300) {
    return response.data ?? { success: true };
  }

  // Propager le message du validator pour comprendre le 400
  const msg = typeof response.data === 'string'
    ? response.data
    : response.data?.message || 'Requête invalide';
  const err = new Error(msg);
  err.status = response.status;
  err.data = response.data;
  throw err;
};
