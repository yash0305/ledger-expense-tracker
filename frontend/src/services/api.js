import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

const API_URL = "https://ledger-expense-tracker-p59q.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/** Fetch all expenses along with the total spent. */
export const fetchExpenses = async () => {
  const { data } = await api.get("/expenses");
  return data; // { success, count, total, data }
};

/** Create a new expense. */
export const addExpense = async (expense) => {
  const { data } = await api.post("/expenses", expense);
  return data.data;
};

/** Delete an expense by id. */
export const removeExpense = async (id) => {
  const { data } = await api.delete(`/expenses/${id}`);
  return data.data;
};

export default api;
