import { getCategoryStamp } from "../constants/categories";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(value);

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

export default function ExpenseItem({ expense, onDelete, isDeleting }) {
  return (
    <li className={`expense-row ${isDeleting ? "expense-row--deleting" : ""}`}>
      <span
        className="expense-row__stamp"
        title={expense.category}
        aria-hidden="true"
      >
        {getCategoryStamp(expense.category)}
      </span>

      <div className="expense-row__main">
        <span className="expense-row__description">{expense.description}</span>
        <span className="expense-row__meta">
          {expense.category} · {formatDate(expense.date)}
        </span>
      </div>

      <span className="expense-row__amount">
        {formatCurrency(expense.amount)}
      </span>

      <button
        type="button"
        className="btn btn--ghost btn--delete"
        onClick={() => onDelete(expense._id)}
        disabled={isDeleting}
        aria-label={`Delete ${expense.description}`}
      >
        {isDeleting ? "…" : "Delete"}
      </button>
    </li>
  );
}
