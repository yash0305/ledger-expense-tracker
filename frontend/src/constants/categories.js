// Category list mirrors the backend's Expense schema enum.
// Each category carries a short stamp label used in the ledger-style badge.
export const CATEGORIES = [
  { value: 'Food', stamp: 'FD' },
  { value: 'Transport', stamp: 'TR' },
  { value: 'Housing', stamp: 'HS' },
  { value: 'Utilities', stamp: 'UT' },
  { value: 'Entertainment', stamp: 'EN' },
  { value: 'Health', stamp: 'HL' },
  { value: 'Shopping', stamp: 'SH' },
  { value: 'Education', stamp: 'ED' },
  { value: 'Other', stamp: 'OT' },
];

export const getCategoryStamp = (category) => {
  const match = CATEGORIES.find((c) => c.value === category);
  return match ? match.stamp : '??';
};
