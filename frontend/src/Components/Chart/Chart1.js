import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useGlobalContext } from '../../context/globalContext'

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
        <div>
            <h3>Expense Distribution</h3>
            <Pie data={chartData} />
        </div>
    );
};

export default ExpenseChart;
