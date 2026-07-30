const mongoose = require('mongoose');
const Expense = require('../models/Expense');

/**
 * @desc    Get all expenses, sorted by most recent date first
 * @route   GET /api/expenses
 * @access  Public
 */
const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find().sort({ date: -1, createdAt: -1 });

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    res.status(200).json({
      success: true,
      count: expenses.length,
      total: Math.round(total * 100) / 100,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a new expense
 * @route   POST /api/expenses
 * @access  Public
 */
const createExpense = async (req, res, next) => {
  try {
    const { amount, description, category, date } = req.body;

    const expense = await Expense.create({ amount, description, category, date });

    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an expense by id
 * @route   DELETE /api/expenses/:id
 * @access  Public
 */
const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid expense id' });
    }

    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExpenses,
  createExpense,
  deleteExpense,
};
