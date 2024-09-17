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
const { saveNote } = require('../controllers/notesController');
const { addExpense, getExpense, deleteExpense, getCategoryTotals } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

// Middleware
const { checkToken } = require('../middleware/authMiddleware');

// Notes route
router.post('/notes', checkToken, saveNote);  // Saving note with token check

// Income routes
router
    .post('/add-income', addIncome)        // Route for adding income
    .get('/get-incomes', getIncomes)       // Route for getting all incomes
    .delete('/delete-income/:id', deleteIncome); // Route for deleting a specific income by ID

// Expense routes
router
    .post('/add-expense', addExpense)      // Route for adding expense
    .get('/get-expenses', getExpense)      // Route for getting all expenses
    .delete('/delete-expense/:id', deleteExpense) // Route for deleting a specific expense by ID
    .get('/get-category-totals', getCategoryTotals); // Route for getting category totals

module.exports = router;
