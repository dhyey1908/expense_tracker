import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: {
        user_id: '',
        category_id: '',
        start_date: '',
        end_date: '',
    },
    selectedExpense: null,
};

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = initialState.filters;
        },
        setSelectedExpense: (state, action) => {
            state.selectedExpense = action.payload;
        },
        clearSelectedExpense: (state) => {
            state.selectedExpense = null;
        },
    },
});

export const { setFilters, clearFilters, setSelectedExpense, clearSelectedExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
