import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  password: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.token = action.payload.token;
    },
    updatePassword(state, action) {
      state.password = action.payload; 
    },
    logout(state) {
      state.username = null; 
      state.password = null;
      state.token = null;
    },
  },
});

export const { setUser, updatePassword, logout } = userSlice.actions;
export default userSlice.reducer;
