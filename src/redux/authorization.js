import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import message from 'helpers/message';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const setToken = token => {
  axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';
};

export const register = createAsyncThunk(
  'user/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/signup', credentials);
      setToken(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logInUser = createAsyncThunk(
  'user/logInUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/login', credentials);
      setToken(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (credentials, { rejectWithValue }) => {
    try {
      await axios.post('/users/logout', credentials);
      setToken(null);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getLastUser = createAsyncThunk('auth/get', async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;

  if (!token) return thunkAPI.rejectWithValue();
  setToken(token);
  try {
    const { data } = await axios.get('/users/current');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  user: { name: '', password: '' },
  token: '',
  isLoggedIn: false,
  isGettingUser: false,
  isFetching: false,
  error: null,
};

const authSlice = createReducer(initialState, {
  [register.pending]: state => {
    state.isFetching = true;
    state.error = null;
  },
  [register.fulfilled]: (state, action) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.isFetching = false;
    state.isLoggedIn = true;
  },

  [register.rejected]: (state, action) => {
    message.error('Registration error', `${action.payload.message}`, 'Ok');
    state.isFetching = false;
  },

  [logInUser.pending]: state => {
    state.isFetching = true;
    state.error = null;
  },
  [logInUser.fulfilled]: (state, action) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.isLoggedIn = true;
    state.isFetching = false;
  },
  [logInUser.rejected]: (state, action) => {
    message.error('Login failed', `${action.payload.message}`, 'Ok');
    state.isFetching = false;
  },

  [logoutUser.pending]: state => {
    state.isFetching = true;
    state.error = null;
  },
  [logoutUser.fulfilled]: (state, action) => {
    state.user = { name: null, email: null };
    state.token = null;
    state.isLoggedIn = false;
  },
  [logoutUser.rejected]: (state, action) => {
    message.error('Logout failed', `${action.payload.message}`, 'Ok');
    state.isFetching = false;
  },

  [getLastUser.pending]: state => {
    state.isGettingUser = true;
    state.isFetching = true;
    state.error = null;
  },
  [getLastUser.fulfilled]: (state, action) => {
    state.user = action.payload;
    state.isLoggedIn = true;
    state.isGettingUser = false;
    state.isFetching = false;
  },
  [getLastUser.rejected]: state => {
    state.isGettingUser = false;
    state.isFetching = false;
  },
});

export default authSlice;
