import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useExpenses, useDeleteExpense, useUpdateExpense, useUsers, useCategories } from '../services/api';

const ExpenseList = () => {
    const filters = useSelector(state => state.expenses.filters);
    const { data, isLoading, error } = useExpenses(filters);
    const deleteExpense = useDeleteExpense();
    const updateExpense = useUpdateExpense();

    const [editingId, setEditingId] = useState(null);
    const { data: usersData } = useUsers();
    const { data: categoriesData } = useCategories();

    const [editData, setEditData] = useState({});
    const [editErrors, setEditErrors] = useState({});

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            try {
                await deleteExpense.mutateAsync(id);
            } catch (error) {
                console.error('Error deleting expense:', error);
                alert('Failed to delete expense');
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (editingId && !e.target.closest('.editing-row')) {
                handleCancelEdit();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [editingId]);

    const handleEdit = (expense) => {
        setEditingId(expense.id);
        setEditData({
            user_id: expense.user_id,
            category_id: expense.category_id,
            amount: expense.amount,
            date: new Date(expense.date).toISOString().split('T')[0],
            description: expense.description || '',
        });
        setEditErrors({});
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditData({});
    };

    const validateEdit = () => {
        const errors = {};
        if (!editData.user_id) errors.user_id = 'User is required';
        if (!editData.category_id) errors.category_id = 'Category is required';
        if (!editData.amount) errors.amount = 'Amount is required';
        else if (parseInt(editData.amount, 10) <= 0) errors.amount = 'Amount must be greater than 0';
        if (!editData.date) errors.date = 'Date is required';
        const selectedDate = new Date(editData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate > today) errors.date = 'Date cannot be in the future';
        setEditErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSaveEdit = async (id) => {
        if (!validateEdit()) return;
        try {
            await updateExpense.mutateAsync({
                id,
                data: {
                    user_id: editData.user_id,
                    category_id: editData.category_id,
                    amount: parseInt(editData.amount, 10),
                    date: editData.date,
                    description: editData.description,
                }
            });
            setEditingId(null);
            setEditData({});
            setEditErrors({});
        } catch (error) {
            console.error('Error updating expense:', error);
            alert('Failed to update expense');
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
        if (editErrors[name]) {
            setEditErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    if (isLoading) {
        return (
            <div className="glass-card">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Loading expenses...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="glass-card">
                <div className="empty-state">
                    <div className="empty-icon">⚠️</div>
                    <div className="empty-text">Error loading expenses</div>
                    <p style={{ color: 'var(--text-muted)' }}>{error.message}</p>
                </div>
            </div>
        );
    }

    const expenses = data?.data || [];

    return (
        <div className="glass-card">
            <div className="section-header">
                <span className="section-icon">📊</span>
                <h2 className="section-title">Expense List</h2>
                <span className="badge badge-amount" style={{ marginLeft: 'auto' }}>
                    {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
                </span>
            </div>

            {expenses.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📝</div>
                    <div className="empty-text">No expenses found</div>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {Object.values(filters).some(v => v)
                            ? 'Try adjusting your filters'
                            : 'Add your first expense to get started'}
                    </p>
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table className="expense-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map(expense => (
                                <tr key={expense.id} className={editingId === expense.id ? "editing-row" : ""}>
                                    <td data-label="User">
                                        {editingId === expense.id ? (
                                            <>
                                                <select
                                                    name="user_id"
                                                    className="form-select"
                                                    value={editData.user_id}
                                                    onChange={handleEditChange}
                                                    style={{ minWidth: '150px' }}
                                                >
                                                    <option value="">Select User</option>
                                                    {usersData?.data?.map(user => (
                                                        <option key={user.id} value={user.id}>{user.name}</option>
                                                    ))}
                                                </select>
                                                {editErrors.user_id && <div className="error-message" style={{ fontSize: '0.8rem', marginTop: '4px' }}>{editErrors.user_id}</div>}
                                            </>
                                        ) : (
                                            <strong>{expense.user_name}</strong>
                                        )}
                                    </td>
                                    <td data-label="Category">
                                        {editingId === expense.id ? (
                                            <>
                                                <select
                                                    name="category_id"
                                                    className="form-select"
                                                    value={editData.category_id}
                                                    onChange={handleEditChange}
                                                    style={{ minWidth: '150px' }}
                                                >
                                                    <option value="">Select Category</option>
                                                    {categoriesData?.data?.map(cat => (
                                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                    ))}
                                                </select>
                                                {editErrors.category_id && <div className="error-message" style={{ fontSize: '0.8rem', marginTop: '4px' }}>{editErrors.category_id}</div>}
                                            </>
                                        ) : (
                                            <span className="badge badge-category">
                                                {expense.category_name}
                                            </span>
                                        )}
                                    </td>
                                    <td data-label="Amount">
                                        {editingId === expense.id ? (
                                            <>
                                                <input
                                                    type="number"
                                                    name="amount"
                                                    value={editData.amount}
                                                    onChange={handleEditChange}
                                                    className="form-input"
                                                    style={{ width: '120px', padding: '6px 10px' }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === '.' || e.key === 'e') {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    step="1"
                                                    min="0"
                                                />
                                                {editErrors.amount && <div className="error-message" style={{ fontSize: '0.8rem', marginTop: '4px' }}>{editErrors.amount}</div>}
                                            </>
                                        ) : (
                                            <span className="badge badge-amount">
                                                ₹{parseFloat(expense.amount).toFixed(0)}
                                            </span>
                                        )}
                                    </td>
                                    <td data-label="Date">
                                        {editingId === expense.id ? (
                                            <>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={editData.date}
                                                    onChange={handleEditChange}
                                                    className="form-input"
                                                    style={{ padding: '6px 10px' }}
                                                    max={new Date().toISOString().split('T')[0]}
                                                    onClick={(e) => e.target.showPicker()}
                                                />
                                                {editErrors.date && <div className="error-message" style={{ fontSize: '0.8rem', marginTop: '4px' }}>{editErrors.date}</div>}
                                            </>
                                        ) : (
                                            new Date(expense.date).toLocaleDateString('en-GB')
                                        )}
                                    </td>
                                    <td data-label="Description">
                                        {editingId === expense.id ? (
                                            <input
                                                type="text"
                                                name="description"
                                                value={editData.description}
                                                onChange={handleEditChange}
                                                className="form-input"
                                                style={{ padding: '6px 10px' }}
                                                maxLength="500"
                                            />
                                        ) : (
                                            <span style={{ color: 'var(--text-secondary)' }}>
                                                {expense.description || '-'}
                                            </span>
                                        )}
                                    </td>
                                    <td data-label="Actions">
                                        {editingId === expense.id ? (
                                            <div className="btn-group">
                                                <button
                                                    onClick={() => handleSaveEdit(expense.id)}
                                                    className="btn btn-success btn-sm"
                                                    disabled={updateExpense.isPending}
                                                >
                                                    ✓ Save
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="btn btn-outline btn-sm"
                                                >
                                                    ✕ Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="btn-group">
                                                <button
                                                    onClick={() => handleEdit(expense)}
                                                    className="btn btn-secondary btn-sm"
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(expense.id)}
                                                    className="btn btn-danger btn-sm"
                                                    disabled={deleteExpense.isPending}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ExpenseList;
