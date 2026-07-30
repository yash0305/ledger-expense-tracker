import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ expenses, onDelete, deletingId, isLoading }) {
  if (isLoading) {
    return (
      <div className="empty-state">
        <p>Loading your entries…</p>
      </div>
    );
  }

  if (!expenses.length) {
    return (
      <div className="empty-state">
        <span className="empty-state__mark" aria-hidden="true">
          ⌂
        </span>
        <p className="empty-state__title">No entries yet</p>
        <p className="empty-state__body">Add your first expense above to start the ledger.</p>
      </div>
    );
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense._id}
          expense={expense}
          onDelete={onDelete}
          isDeleting={deletingId === expense._id}
        />
      ))}
    </ul>
  );
}
