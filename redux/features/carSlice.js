import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCarsByUser } from '../../apiCalls/getAllCarsByUser';
import { addCar } from '../../apiCalls/addCar';

export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
  try {
    const cars = await getAllCarsByUser();
    return cars.map((car) => car.model); 
  } catch (error) {
    throw new Error('Erreur lors de la récupération des véhicules');
  }
});

export const addNewCar = createAsyncThunk(
  'cars/addNewCar',
  async ({ model, licensePlate,username }) => {
    const created = await addCar({ model, licensePlate,username });
    return created;
  }
);


const carSlice = createSlice({
  name: 'cars',
  initialState: {
    items: [], 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
       .addCase(addNewCar.fulfilled, (state, action) => {
        const model = action.payload?.model ?? action.meta.arg.model;
        state.items.push(model);
      })
      .addCase(addNewCar.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default carSlice.reducer; 
