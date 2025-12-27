import React from 'react';
import ExpenseForm from './components/ExpenseForm';
import FilterSection from './components/FilterSection';
import ExpenseList from './components/ExpenseList';
import Statistics from './components/Statistics';

function App() {
    return (
        <div className="App">
            <header className="app-header">
                <h1 className="app-title">💰 Expense Tracker</h1>
                <p className="app-subtitle">Track, Analyze, and Manage Your Expenses with Ease</p>
            </header>

            <main className="main-container">
                {/* Add Expense Form */}
                <ExpenseForm />

                {/* Filter Section */}
                <FilterSection />

                {/* Expense List */}
                <ExpenseList />

                {/* Statistics */}
                <Statistics />
            </main>

            <footer style={{
                textAlign: 'center',
                padding: 'var(--spacing-xl) 0',
                color: 'var(--text-muted)',
                fontSize: '0.9rem'
            }}>
                <p>Built with ❤️ using React, Redux, Node.js & MySQL</p>
                <p style={{ marginTop: '8px' }}>MERN Stack Assignment - 2025</p>
            </footer>
        </div>
    );
}

export default App;
