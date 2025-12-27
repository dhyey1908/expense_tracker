import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUsers, useCategories } from '../services/api';
import { setFilters, clearFilters } from '../store/slices/expenseSlice';

const FilterSection = () => {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.expenses.filters);
    const { data: usersData } = useUsers();
    const { data: categoriesData } = useCategories();

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFilters({ [name]: value }));
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
    };

    const isAnyFilterApplied = Object.values(filters).some(value => value !== '');

    return (
        <div className="glass-card">
            <div className="section-header">
                <span className="section-icon">🔍</span>
                <h2 className="section-title">Filter Expenses</h2>
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label className="form-label" htmlFor="filter_user">Filter by User</label>
                    <select
                        id="filter_user"
                        name="user_id"
                        className="form-select"
                        value={filters.user_id}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Users</option>
                        {usersData?.data?.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="filter_category">Filter by Category</label>
                    <select
                        id="filter_category"
                        name="category_id"
                        className="form-select"
                        value={filters.category_id}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Categories</option>
                        {categoriesData?.data?.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="filter_start_date">Start Date</label>
                    <input
                        id="filter_start_date"
                        type="date"
                        name="start_date"
                        className="form-input"
                        value={filters.start_date}
                        onChange={handleFilterChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="filter_end_date">End Date</label>
                    <input
                        id="filter_end_date"
                        type="date"
                        name="end_date"
                        className="form-input"
                        value={filters.end_date}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>

            {isAnyFilterApplied && (
                <div className="mt-2">
                    <button
                        onClick={handleClearFilters}
                        className="btn btn-outline btn-sm"
                    >
                        🔄 Clear All Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default FilterSection;
