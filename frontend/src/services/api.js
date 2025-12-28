import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const expenseAPI = {
    getAll: (filters) => api.get('/expenses', { params: filters }),
    getById: (id) => api.get(`/expenses/${id}`),
    create: (data) => api.post('/expenses', data),
    update: (id, data) => api.put(`/expenses/${id}`, data),
    delete: (id) => api.delete(`/expenses/${id}`),
};

export const userAPI = {
    getAll: () => api.get('/users'),
};

export const categoryAPI = {
    getAll: () => api.get('/categories'),
};

export const statisticsAPI = {
    topDays: () => api.get('/statistics/top-days'),
    monthlyChange: () => api.get('/statistics/monthly-change'),
    predictNextMonth: () => api.get('/statistics/predict-next-month'),
};

export const useExpenses = (filters) => {
    return useQuery({
        queryKey: ['expenses', filters],
        queryFn: () => expenseAPI.getAll(filters).then(res => res.data),
    });
};

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => userAPI.getAll().then(res => res.data),
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryAPI.getAll().then(res => res.data),
    });
};

export const useStatistics = () => {
    const topDays = useQuery({
        queryKey: ['statistics', 'top-days'],
        queryFn: () => statisticsAPI.topDays().then(res => res.data),
    });

    const monthlyChange = useQuery({
        queryKey: ['statistics', 'monthly-change'],
        queryFn: () => statisticsAPI.monthlyChange().then(res => res.data),
    });

    const predictNextMonth = useQuery({
        queryKey: ['statistics', 'predict-next-month'],
        queryFn: () => statisticsAPI.predictNextMonth().then(res => res.data),
    });

    return { topDays, monthlyChange, predictNextMonth };
};

export const useCreateExpense = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => expenseAPI.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            queryClient.invalidateQueries({ queryKey: ['statistics'] });
        },
    });
};

export const useUpdateExpense = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => expenseAPI.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            queryClient.invalidateQueries({ queryKey: ['statistics'] });
        },
    });
};

export const useDeleteExpense = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => expenseAPI.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            queryClient.invalidateQueries({ queryKey: ['statistics'] });
        },
    });
};
