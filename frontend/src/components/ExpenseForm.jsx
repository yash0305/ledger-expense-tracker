import { useState } from "react";
import { CATEGORIES } from "../constants/categories";

const todayISO = () => new Date().toISOString().split("T")[0];

const initialState = {
  amount: "",
  description: "",
  category: CATEGORIES[0].value,
  date: todayISO(),
};

export default function ExpenseForm({ onAdd, isSubmitting }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const next = {};
    const amountNumber = parseFloat(form.amount);

    if (!form.amount || Number.isNaN(amountNumber) || amountNumber <= 0) {
      next.amount = "Enter an amount greater than 0";
    }
    if (!form.description.trim()) {
      next.description = "Add a short description";
    }
    if (!form.category) {
      next.category = "Choose a category";
    }
    if (!form.date) {
      next.date = "Choose a date";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await onAdd({
      amount: parseFloat(form.amount),
      description: form.description.trim(),
      category: form.category,
      date: form.date,
    });

    setForm({ ...initialState, date: todayISO() });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      <h2 className="expense-form__title">Add an entry</h2>

      <div className="expense-form__grid">
        <div className={`field ${errors.amount ? "field--error" : ""}`}>
          <label htmlFor="amount">Amount</label>
          <div className="field__amount-wrap">
            <span className="field__prefix" aria-hidden="true">
              ₹
            </span>
            <input
              id="amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
          {errors.amount && (
            <span className="field__error">{errors.amount}</span>
          )}
        </div>

        <div className={`field ${errors.date ? "field--error" : ""}`}>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.date && <span className="field__error">{errors.date}</span>}
        </div>

        <div
          className={`field field--span2 ${errors.description ? "field--error" : ""}`}
        >
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="e.g. Groceries at the market"
            maxLength={120}
            value={form.description}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.description && (
            <span className="field__error">{errors.description}</span>
          )}
        </div>

        <div className={`field ${errors.category ? "field--error" : ""}`}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.value}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="field__error">{errors.category}</span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="btn btn--primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding…" : "Add expense"}
      </button>
    </form>
  );
}
