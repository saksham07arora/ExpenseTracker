import React, { useContext, useState } from "react";
import axios from 'axios';
import { useMsal } from '@azure/msal-react';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const { instance, accounts } = useMsal();

    // Add income
    const addIncome = async (income) => {
        if (accounts.length > 0) {
            income['user'] = accounts[0].username;
            try {
                await axios.post(`${BASE_URL}add-income`, income);
                getIncomes();
            } catch (err) {
                setError(err.response.data.message || 'Error adding income');
            }
        }
    };

    // Get all incomes
    const getIncomes = async () => {
        if (accounts.length > 0) {
            const id = accounts[0].username;
            try {
                const response = await axios.get(`${BASE_URL}get-incomes/${id}`);
                setIncomes(response.data);
            } catch (err) {
                setError(err.response.data.message || 'Error fetching incomes');
            }
        }
    };

    // Delete income
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`);
            getIncomes();
        } catch (err) {
            setError(err.response.data.message || 'Error deleting income');
        }
    };

    // Total income
    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    // Add expense
    const addExpense = async (expense) => {
        if (accounts.length > 0) {
            expense['user'] = accounts[0].username;
            try {
                await axios.post(`${BASE_URL}add-expense`, expense);
                getExpenses();
            } catch (err) {
                setError(err.response.data.message || 'Error adding expense');
            }
        }
    };

    // Get all expenses
    const getExpenses = async () => {
        if (accounts.length > 0) {
            const id = accounts[0].username;
            try {
                const response = await axios.get(`${BASE_URL}get-expenses/${id}`);
                setExpenses(response.data);
            } catch (err) {
                setError(err.response.data.message || 'Error fetching expenses');
            }
        }
    };

    // Delete expense
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
            getExpenses();
        } catch (err) {
            setError(err.response.data.message || 'Error deleting expense');
        }
    };

    // Total expenses
    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    // Total balance
    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    // Transaction history (last 3)
    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    // Get category totals
    const getCategoryTotals = async () => {
        if (accounts.length > 0) {
            const id = accounts[0].username;
            try {
                const response = await axios.get(`${BASE_URL}get-category-totals/${id}`);
                return response.data;
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching category totals');
                return [];
            }
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                addIncome,
                getIncomes,
                incomes,
                deleteIncome,
                expenses,
                totalIncome,
                addExpense,
                getExpenses,
                deleteExpense,
                totalExpenses,
                totalBalance,
                transactionHistory,
                error,
                setError,
                getCategoryTotals,
                isLoggedIn,
                setIsLoggedIn,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
