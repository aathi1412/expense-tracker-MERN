import {LuPlus} from 'react-icons/lu'
import CustomBarChart from '../charts/CustomBarChart'
import { useState,useEffect } from 'react';
import { prepareIncomeBarChartData } from '../../utils/helper';

function IncomeOverview({transactions, onAddIncome}) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);
    }, [transactions]);

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg'>Recent Transactions</h5>
                <p className='text-xs text-gray-400 mt-0.5'>
                    Track your earnings over time and analyse your income trends
                </p>
            </div>
            <button className='add-btn add-btn-fill' onClick={onAddIncome}>
                <LuPlus className='text-lg'/> Add Income
            </button>
        </div>

        <div className='mt-10'>
            {transactions.length === 0 
            ? (<p className='text-center text-lg'>Add your Income</p>)
            :(
                <CustomBarChart
                    data={chartData}
                    dataKey="month"
                />
            )}
        </div>
    </div>
  )
}

export default IncomeOverview