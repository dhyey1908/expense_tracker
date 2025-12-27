import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './slices/expenseSlice';

export const store = configureStore({
    reducer: {
        expenses: expenseReducer,
    },
});
