import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define user type separately for reuse
interface User {
  id: string;
  email: string;
}

// Define auth state
interface AuthState {
  user: User | null;
  token: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
