import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useGlobalContext } from '../../context/globalContext'

import styled from 'styled-components'

const ExpenseChart = () => {
    const { getCategoryTotals } = useGlobalContext();
    const [chartData, setChartData] = useState(null); // Changed to null initially
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const totals = await getCategoryTotals();

                if (totals && totals.length > 0) {
                    const categories = totals.map(item => item._id || 'Unknown'); // Fallback in case _id is undefined
                    const amounts = totals.map(item => item.totalAmount || 0); // Fallback in case totalAmount is undefined

                    setChartData({
                        labels: categories,
                        datasets: [
                            {
                                label: 'Expenses by Category',
                                data: amounts,
                                backgroundColor: [
                                    '#ff6384',
                                    '#36a2eb',
                                    '#ffce56',
                                    '#cc65fe',
                                    '#ff9f40',
                                    '#4bc0c0',
                                    '#9966ff'
                                ],
                            },
                        ],
                    });
                } else {
                    console.warn('No data available');
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Stop loading after fetching is complete
            }
        };

        fetchData();
    }, [getCategoryTotals]);

    if (loading) {
        return <div>Loading chart...</div>; // Display while loading
    }

    if (!chartData) {
        return <div>No data available for chart</div>; // Handle empty data
    }

    return (
        <ChartStyled>
            <h3>Expense Distribution</h3>
            <Pie data={chartData} />
        </ChartStyled>
    );
};

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 2rem;
    border-radius: 20px;
    height: 400px;
    width: 45%; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 700px){
        width: 100%; 
        margin-top: 10px;
    }
`;

export default ExpenseChart;
