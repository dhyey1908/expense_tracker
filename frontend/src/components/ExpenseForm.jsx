import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUsers, useCategories, useCreateExpense } from '../services/api';
import { clearSelectedExpense } from '../store/slices/expenseSlice';

const ExpenseForm = () => {
    const dispatch = useDispatch();
    const { data: usersData } = useUsers();
    const { data: categoriesData } = useCategories();
    const createExpense = useCreateExpense();

    const [formData, setFormData] = useState({
        user_id: '',
        category_id: '',
        amount: '',
        date: '',
        description: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = () => {
        const newErrors = {};

        if (!formData.user_id) {
            newErrors.user_id = 'Please select a user';
        }

        if (!formData.category_id) {
            newErrors.category_id = 'Please select a category';
        }

        if (!formData.amount) {
            newErrors.amount = 'Amount is required';
        } else if (parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Amount must be greater than 0';
        }

        if (!formData.date) {
            newErrors.date = 'Date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // Clear success message
        if (successMessage) {
            setSuccessMessage('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await createExpense.mutateAsync({
                ...formData,
                amount: parseFloat(formData.amount),
            });

            setSuccessMessage('✅ Expense added successfully!');

            // Reset form
            setFormData({
                user_id: '',
                category_id: '',
                amount: '',
                date: '',
                description: '',
            });

            setErrors({});

            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error adding expense:', error);
            const errorMsg = error.response?.data?.message || 'Failed to add expense';
            setErrors({ submit: errorMsg });
        }
    };

    return (
        <div className="glass-card">
            <div className="section-header">
                <span className="section-icon">💰</span>
                <h2 className="section-title">Add New Expense</h2>
            </div>

            {successMessage && (
                <div style={{
                    padding: '12px 16px',
                    background: 'linear-gradient(135deg, #51cf66 0%, #37b24d 100%)',
                    color: 'white',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    fontWeight: '600',
                    animation: 'fadeInDown 0.3s ease'
                }}>
                    {successMessage}
                </div>
            )}

            {errors.submit && (
                <div style={{
                    padding: '12px 16px',
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)',
                    color: 'white',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    fontWeight: '600'
                }}>
                    ❌ {errors.submit}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label" htmlFor="user_id">User *</label>
                        <select
                            id="user_id"
                            name="user_id"
                            className="form-select"
                            value={formData.user_id}
                            onChange={handleChange}
                        >
                            <option value="">Select User</option>
                            {usersData?.data?.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {errors.user_id && <div className="error-message">{errors.user_id}</div>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="category_id">Category *</label>
                        <select
                            id="category_id"
                            name="category_id"
                            className="form-select"
                            value={formData.category_id}
                            onChange={handleChange}
                        >
                            <option value="">Select Category</option>
                            {categoriesData?.data?.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <div className="error-message">{errors.category_id}</div>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="amount">Amount ($) *</label>
                        <input
                            id="amount"
                            type="number"
                            name="amount"
                            className="form-input"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Enter amount"
                            step="0.01"
                            min="0"
                        />
                        {errors.amount && <div className="error-message">{errors.amount}</div>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="date">Date *</label>
                        <input
                            id="date"
                            type="date"
                            name="date"
                            className="form-input"
                            value={formData.date}
                            onChange={handleChange}
                        />
                        {errors.date && <div className="error-message">{errors.date}</div>}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="description">Description (Optional)</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-textarea"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter expense description..."
                        maxLength="500"
                    />
                </div>

                <div className="btn-group mt-2">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={createExpense.isPending}
                    >
                        {createExpense.isPending ? '⏳ Adding...' : '➕ Add Expense'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExpenseForm;
