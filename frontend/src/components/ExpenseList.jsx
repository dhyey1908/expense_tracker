import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useExpenses, useDeleteExpense, useUpdateExpense } from '../services/api';

const ExpenseList = () => {
    const filters = useSelector(state => state.expenses.filters);
    const { data, isLoading, error } = useExpenses(filters);
    const deleteExpense = useDeleteExpense();
    const updateExpense = useUpdateExpense();

    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

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

    const handleEdit = (expense) => {
        setEditingId(expense.id);
        setEditData({
            amount: expense.amount,
            date: expense.date,
            description: expense.description || '',
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditData({});
    };

    const handleSaveEdit = async (id) => {
        try {
            await updateExpense.mutateAsync({
                id,
                data: {
                    amount: parseInt(editData.amount, 10),
                    date: editData.date,
                    description: editData.description,
                }
            });
            setEditingId(null);
            setEditData({});
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
                                <tr key={expense.id}>
                                    <td data-label="User">
                                        <strong>{expense.user_name}</strong>
                                    </td>
                                    <td data-label="Category">
                                        <span className="badge badge-category">
                                            {expense.category_name}
                                        </span>
                                    </td>
                                    <td data-label="Amount">
                                        {editingId === expense.id ? (
                                            <input
                                                type="number"
                                                name="amount"
                                                value={editData.amount}
                                                onChange={handleEditChange}
                                                className="form-input"
                                                style={{ width: '120px', padding: '6px 10px' }}
                                                step="1"
                                                min="0"
                                            />
                                        ) : (
                                            <span className="badge badge-amount">
                                                ₹{parseFloat(expense.amount).toFixed(0)}
                                            </span>
                                        )}
                                    </td>
                                    <td data-label="Date">
                                        {editingId === expense.id ? (
                                            <input
                                                type="date"
                                                name="date"
                                                value={editData.date}
                                                onChange={handleEditChange}
                                                className="form-input"
                                                style={{ padding: '6px 10px' }}
                                            />
                                        ) : (
                                            new Date(expense.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })
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
