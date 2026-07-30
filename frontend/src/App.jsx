import { useEffect, useState, useCallback } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import TotalSummary from './components/TotalSummary';
import { fetchExpenses, addExpense, removeExpense } from './services/api';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');

  const loadExpenses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const { data, total: totalAmount } = await fetchExpenses();
      setExpenses(data);
      setTotal(totalAmount);
    } catch (err) {
      setError('Could not load expenses. Is the backend server running?');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const handleAdd = async (expenseData) => {
    try {
      setIsSubmitting(true);
      setError('');
      const created = await addExpense(expenseData);
      setExpenses((prev) => [created, ...prev]);
      setTotal((prev) => Math.round((prev + created.amount) * 100) / 100);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add this expense. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const target = expenses.find((expense) => expense._id === id);
    try {
      setDeletingId(id);
      setError('');
      await removeExpense(id);
      setExpenses((prev) => prev.filter((expense) => expense._id !== id));
      if (target) {
        setTotal((prev) => Math.round((prev - target.amount) * 100) / 100);
      }
    } catch (err) {
      setError('Could not delete this expense. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="page">
      <div className="page__inner">
        <Header />

        {error && (
          <div className="banner banner--error" role="alert">
            {error}
          </div>
        )}

        <TotalSummary total={total} count={expenses.length} />

        <div className="layout">
          <ExpenseForm onAdd={handleAdd} isSubmitting={isSubmitting} />

          <section className="ledger-panel" aria-label="Expense entries">
            <h2 className="ledger-panel__title">Recent entries</h2>
            <ExpenseList
              expenses={expenses}
              onDelete={handleDelete}
              deletingId={deletingId}
              isLoading={isLoading}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
