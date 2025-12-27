import React from 'react';
import ExpenseForm from './components/ExpenseForm';
import { Toaster } from 'react-hot-toast';
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
                <ExpenseForm />
                <FilterSection />
                <ExpenseList />
                <Statistics />
            </main>
            <Toaster position="top-right" />
        </div>
    );
}

export default App;
