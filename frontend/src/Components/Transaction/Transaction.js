import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';

import { dateFormat } from '../../utils/dateFormat' // Update path as needed
import Button from '../Button/Button'; // Update path as needed

function FinancialRecords() {
    const { addIncome, expenses, incomes, getExpenses, getIncomes, deleteExpense, deleteIncome } = useGlobalContext();
    const [activeTab, setActiveTab] = useState('income'); // To toggle between 'income' and 'expense'
    const [filter, setFilter] = useState('all'); // To toggle between 'all', 'daily', 'weekly', 'monthly'
    const [error, setError] = useState(null); // To store any errors

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getIncomes();
                await getExpenses();
            } catch (error) {
                setError('Failed to fetch data. Please try again later.');
                console.error('Fetch data error:', error);
            }
        };

        fetchData();
    }, []); // Empty array will fetch data only once

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filterRecords = (records) => {
        const now = new Date();
        switch (filter) {
            case 'daily':
                return records.filter(record => new Date(record.date).toDateString() === now.toDateString());
            case 'weekly':
                const startOfWeek = now.getDate() - now.getDay();
                const endOfWeek = startOfWeek + 6;
                const start = new Date(now.setDate(startOfWeek));
                const end = new Date(now.setDate(endOfWeek));
                return records.filter(record => new Date(record.date) >= start && new Date(record.date) <= end);
            case 'monthly':
                return records.filter(record => new Date(record.date).getMonth() === now.getMonth() && new Date(record.date).getFullYear() === now.getFullYear());
            default:
                return records;
        }
    };

    return (
        <FinancialRecordsStyled>
            <InnerLayout>
                <div className="tabs">
                    <Button
                        name="Income"
                        onClick={() => setActiveTab('income')}
                        bg={activeTab === 'income' ? '#007bff' : '#f0f0f0'}
                        color={activeTab === 'income' ? '#fff' : '#000'}
                        bPad="1rem"
                        bRad="5px"
                    />
                    <Button
                        name="Expense"
                        onClick={() => setActiveTab('expense')}
                        bg={activeTab === 'expense' ? '#007bff' : '#f0f0f0'}
                        color={activeTab === 'expense' ? '#fff' : '#000'}
                        bPad="1rem"
                        bRad="5px"
                    />
                </div>
                <div className="filters">
                    <select value={filter} onChange={handleFilterChange}>
                        <option value="all">All Time</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="table-container">
                    {activeTab === 'income' && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterRecords(incomes).map((income) => {
                                    const { _id, title, amount, date, category } = income;
                                    return (
                                        <tr key={_id}>
                                            <td>{title}</td>
                                            <td>{category}</td>
                                            <td>{dateFormat(date)}</td>
                                            <td>₹{amount}</td>
                                            <td>
                                                <Button
                                                    name="Delete"
                                                    onClick={() => deleteIncome(_id)}
                                                    bg="#ff4d4d"
                                                    color="#fff"
                                                    bPad="0.5rem 1rem"
                                                    bRad="5px"
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                    {activeTab === 'expense' && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterRecords(expenses).map((expense) => {
                                    const { _id, title, amount, date, category } = expense;
                                    return (
                                        <tr key={_id}>
                                            <td>{title}</td>
                                            <td>{category}</td>
                                            <td>{dateFormat(date)}</td>
                                            <td>₹{amount}</td>
                                            <td>
                                                <Button
                                                    name="Delete"
                                                    onClick={() => deleteExpense(_id)}
                                                    bg="#ff4d4d"
                                                    color="#fff"
                                                    bPad="0.5rem 1rem"
                                                    bRad="5px"
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </InnerLayout>
        </FinancialRecordsStyled>
    );
}

const FinancialRecordsStyled = styled.div`
    .tabs {
        display: flex;
        margin-bottom: 1rem;
    }

    .filters {
        margin-bottom: 1rem;
        
        select {
            padding: 0.5rem;
            border-radius: 5px;
            border: 1px solid #ddd;
        }
    }

    .error-message {
        color: red;
        margin-bottom: 1rem;
    }

    .table-container {
        overflow-x: none;
        display: flex;
        flex: wrap;
        @media(max-width: 600px){
            overflow-x: auto;
        }
        justify-content: center;
        table {
            width: 90%;
            border-collapse: collapse;
            
            th, td {
                padding: 0.75rem;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
            
            th {
                background: #f4f4f4;
            }
        }
    }
`;

export default FinancialRecords;

