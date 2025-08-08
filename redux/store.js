import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import carReducer from './features/carSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cars: carReducer, // Reducer pour les voitures
  },
});

export default store;
