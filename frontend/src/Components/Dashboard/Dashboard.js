import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';

import Chart from '../Chart/Chart';

import ExpenseChart from '../Chart/Chart1';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
        console.log("total expenses:",totalExpenses())
    }, []);

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1 className='text-2xl font-extrabold'>All Transactions</h1>
                <div className="stats-con">
                    <div className="amount-con">
                        <div className="income">
                            <h2>Total Income</h2>
                            <p>₹{totalIncome()}</p>
                        </div>
                        <div className="expense">
                            <h2>Total Expense</h2>
                            <p>₹{totalExpenses()}</p>
                        </div>
                        <div className="balance">
                            <h2>Total Balance</h2>
                            <p>₹{totalBalance()}</p>
                        </div>
                    </div>
                    <div className="chart-con">
                        <div className="charts">
                            <Chart />
                            <ExpenseChart />
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span> Max</h2>
                        <div className="salary-item">
                            <p>₹{Math.min(...incomes.map(item => item.amount)) !== Infinity ? Math.min(...incomes.map(item => item.amount)) : 0}</p>
                            <p>₹{Math.max(...incomes.map(item => item.amount)) !== -Infinity ? Math.max(...incomes.map(item => item.amount)) : 0}</p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span> Max</h2>
                        <div className="salary-item">
                        <p>₹{Math.min(...expenses.map(item => item.amount)) !== Infinity ? Math.min(...expenses.map(item => item.amount)) : 0}</p>
                        <p>₹{Math.max(...expenses.map(item => item.amount)) !== -Infinity ? Math.max(...expenses.map(item => item.amount)) : 0}</p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .stats-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        
        .amount-con {
            grid-column: 1 / -1;
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem;


            @media (max-width: 768px) {
                display:flex;
                flex-direction: column;
            }
            .expense{
                color: red;
            }    
            .income, .expense, .balance {
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                border-radius: 20px;
                padding: 1rem;
                width: 30%;
                text-align: center;
                p {
                    font-size: 2.5rem;
                    font-weight: 700;
                    @media(min-width: 760px){
                        font-size: 2rem;
                        padding: 2px;
                    }
                }
                @media (min-width: 699px) {
                    width: 100%;
                    margin-bottom: 10px;
                }
                @media (max-width: 700px) {
                    width: 100%;
                    margin-bottom: 10px;
                }
                @media(min-width: 701px){
                    margin-left: 1rem;
                }
            }
            .balance p {
                color: green;
            }
        }

        

        .chart-con {
            grid-column: 1 / -1;
            display: flex;
            justify-content: space-between;

            .charts {
                display: flex;
                width: 100%;
                justify-content: space-around;

                @media (max-width: 700px) {
                    display:flex;
                    flex-direction: column;
                }
                .chart, .expense-chart {
                    width: 45%; 
                }
            }
        }
            

        .history-con {
            grid-column: 1 / -1;
            margin-top: 2rem;
            
            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .salary-title {
                font-size: 1.2rem;
                span {
                    font-size: 1.8rem;
                }
            }

            .salary-item {
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p {
                    font-weight: 600;
                    font-size: 1.6rem;
                    
                }
                
            }
        }
    }
 

`;

export default Dashboard;