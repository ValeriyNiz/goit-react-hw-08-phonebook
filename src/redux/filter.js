import { createSlice } from '@reduxjs/toolkit';

export const filter = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filteredContacts(state, action) {
      return (state = action.payload);
    },
  },
});

export default filter.reducer;
export const getFilter = state => state.filter;
export const { filteredContacts } = filter.actions;
