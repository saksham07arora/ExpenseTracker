// const { addExpense, getExpense, deleteExpense,getCategoryTotals } = require('../controllers/expense');
// const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

// const router = require('express').Router();

// router
//     .post('/add-income', addIncome)
//     .get('/get-incomes', getIncomes)
//     .delete('/delete-income/:id', deleteIncome)
//     .post('/add-expense', addExpense)
//     .get('/get-expenses', getExpense)
//     .delete('/delete-expense/:id', deleteExpense)
//     .get('/get-category-totals', getCategoryTotals);

// module.exports = router;

const express = require('express');
const router = express.Router();

// Controllers
const { addExpense, getExpense, deleteExpense, getCategoryTotals } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

// Income routes
router
    .post('/add-income', addIncome)        // Add income
    .get('/get-incomes/:id', getIncomes)   // Get incomes by user ID
    .delete('/delete-income/:id', deleteIncome); // Delete income by ID

// Expense routes
router
    .post('/add-expense', addExpense)      // Add expense
    .get('/get-expenses/:id', getExpense)  // Get expenses by user ID
    .delete('/delete-expense/:id', deleteExpense) // Delete expense by ID
    .get('/get-category-totals/:id', getCategoryTotals); // Get category totals by user ID

module.exports = router;

