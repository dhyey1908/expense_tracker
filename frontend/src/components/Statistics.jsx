import React from 'react';
import { useStatistics } from '../services/api';

const Statistics = () => {
    const { topDays, monthlyChange, predictNextMonth } = useStatistics();

    const LoadingCard = ({ title }) => (
        <div className="stat-card">
            <div className="stat-header">
                <h3 className="stat-title">{title}</h3>
            </div>
            <div className="loading">
                <div className="loading-spinner" style={{ width: '30px', height: '30px', borderWidth: '3px' }}></div>
            </div>
        </div>
    );

    const ErrorCard = ({ title, error }) => (
        <div className="stat-card">
            <div className="stat-header">
                <h3 className="stat-title">{title}</h3>
            </div>
            <div className="empty-state">
                <div className="empty-icon" style={{ fontSize: '2rem' }}>⚠️</div>
                <div className="empty-text" style={{ fontSize: '0.9rem' }}>Error loading data</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{error.message}</p>
            </div>
        </div>
    );

    return (
        <div className="glass-card">
            <div className="section-header">
                <span className="section-icon">📈</span>
                <h2 className="section-title">Statistics & Analytics</h2>
            </div>

            <div className="stats-grid">
                {/* Statistic 1: Top 3 Days by Expenditure */}
                {topDays.isLoading ? (
                    <LoadingCard title="Top 3 Spending Days per User" />
                ) : topDays.error ? (
                    <ErrorCard title="Top 3 Spending Days per User" error={topDays.error} />
                ) : (
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3 className="stat-title">📅 Top 3 Spending Days per User</h3>
                            <span className="stat-icon">🔥</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--spacing-md)' }}>
                            Highest spending days ordered by total expenditure
                        </p>
                        <div className="stat-content">
                            {topDays.data?.data?.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-text" style={{ fontSize: '0.9rem' }}>No data available</div>
                                </div>
                            ) : (
                                topDays.data?.data?.map(userData => (
                                    <div key={userData.user_id} style={{ marginBottom: 'var(--spacing-md)' }}>
                                        <div className="stat-user">{userData.user_name}</div>
                                        {userData.top_days.map((day, index) => (
                                            <div key={index} className="stat-item">
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ color: 'var(--text-primary)' }}>
                                                        #{index + 1} - {new Date(day.date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                    <span className="badge badge-amount" style={{ fontSize: '0.85rem' }}>
                                                        ₹{parseFloat(day.amount).toFixed(0)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Statistic 2: Monthly Percentage Change */}
                {monthlyChange.isLoading ? (
                    <LoadingCard title="Monthly Expenditure Change" />
                ) : monthlyChange.error ? (
                    <ErrorCard title="Monthly Expenditure Change" error={monthlyChange.error} />
                ) : (
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3 className="stat-title">📊 Monthly Expenditure Change</h3>
                            <span className="stat-icon">📉</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--spacing-md)' }}>
                            Percentage change from previous month
                        </p>
                        <div className="stat-content">
                            {monthlyChange.data?.data?.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-text" style={{ fontSize: '0.9rem' }}>No data available</div>
                                </div>
                            ) : (
                                (() => {
                                    const groupedByUser = {};
                                    monthlyChange.data?.data?.forEach(item => {
                                        if (!groupedByUser[item.user_id]) {
                                            groupedByUser[item.user_id] = {
                                                user_name: item.user_name,
                                                months: []
                                            };
                                        }
                                        groupedByUser[item.user_id].months.push(item);
                                    });

                                    return Object.values(groupedByUser).map(userData => (
                                        <div key={userData.user_name} style={{ marginBottom: 'var(--spacing-md)' }}>
                                            <div className="stat-user">{userData.user_name}</div>
                                            {userData.months.map((month, index) => (
                                                <div key={index} className="stat-item">
                                                    <div style={{ marginBottom: '4px' }}>
                                                        <strong style={{ color: 'var(--text-primary)' }}>
                                                            {month.current_month}
                                                        </strong>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '2px' }}>
                                                        <span style={{ color: 'var(--text-muted)' }}>Previous:</span>
                                                        <span style={{ color: 'var(--text-secondary)' }}>
                                                            ₹{parseFloat(month.previous_amount).toFixed(0)}
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                                                        <span style={{ color: 'var(--text-muted)' }}>Current:</span>
                                                        <span style={{ color: 'var(--text-secondary)' }}>
                                                            ₹{parseFloat(month.current_amount).toFixed(0)}
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Change:</span>
                                                        <span className={month.percentage_change >= 0 ? 'positive-change' : 'negative-change'}
                                                            style={{ fontWeight: '700', fontSize: '1rem' }}>
                                                            {month.percentage_change >= 0 ? '+' : ''}{month.percentage_change}%
                                                            {month.percentage_change >= 0 ? ' ↑' : ' ↓'}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ));
                                })()
                            )}
                        </div>
                    </div>
                )}

                {/* Statistic 3: Next Month Prediction */}
                {predictNextMonth.isLoading ? (
                    <LoadingCard title="Next Month Prediction" />
                ) : predictNextMonth.error ? (
                    <ErrorCard title="Next Month Prediction" error={predictNextMonth.error} />
                ) : (
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3 className="stat-title">🔮 Next Month Prediction</h3>
                            <span className="stat-icon">💡</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--spacing-md)' }}>
                            Based on average of last 3 months
                        </p>
                        <div className="stat-content">
                            {predictNextMonth.data?.data?.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-text" style={{ fontSize: '0.9rem' }}>No data available</div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                        Need at least 1 month of data
                                    </p>
                                </div>
                            ) : (
                                predictNextMonth.data?.data?.map(userData => (
                                    <div key={userData.user_id} className="stat-item" style={{ marginBottom: 'var(--spacing-sm)' }}>
                                        <div className="stat-user" style={{ marginBottom: '8px' }}>
                                            {userData.user_name}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                                            Predicted for: <strong style={{ color: 'var(--text-primary)' }}>{userData.next_month}</strong>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                            Based on {userData.months_analyzed} month{userData.months_analyzed > 1 ? 's' : ''}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>Predicted Amount:</span>
                                            <span className="badge badge-amount" style={{ fontSize: '1.1rem', fontWeight: '800' }}>
                                                ₹{parseFloat(userData.predicted_amount).toFixed(0)}
                                            </span>
                                        </div>
                                        <div style={{
                                            fontSize: '0.75rem',
                                            color: 'var(--text-muted)',
                                            marginTop: '8px',
                                            paddingTop: '8px',
                                            borderTop: '1px solid var(--border-glass)'
                                        }}>
                                            {userData.last_months_data}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Statistics;
