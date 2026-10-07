import {LuPlus} from 'react-icons/lu'
import CustomLineChart from '../charts/CustomLineChart'
import { useState,useEffect } from 'react';
import { prepareExpenseLineChartData } from '../../utils/helper';

function ExpenseOverview({transactions, onAddExpense}) {
    const [chartData, setChartData] = useState([]);
    
    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);
    }, [transactions]);

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg'>Expense Overview</h5>
                <p className='text-xs text-gray-400 mt-0.5'>
                    Track your spending trends over time and gain insights your money goes.
                </p>
            </div>
            <button className='add-btn add-btn-fill' onClick={onAddExpense}>
                <LuPlus className='text-lg'/> Add Expense
            </button>
        </div>

        <div className='mt-10'>
            {chartData.length === 0 
            ? (<p className='text-center text-lg'>Add your expenses</p>)
            :(<CustomLineChart
                data={chartData}
            />)}
            
        </div>
    </div>
  )
}

export default ExpenseOverview;