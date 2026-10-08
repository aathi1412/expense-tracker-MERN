import { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from "../../utils/helper"
import CustomBarChart from "../charts/CustomBarChart"

function Last30DaysExpenses({ data }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);
    }, [data]);
    
  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 30 Days Expenses</h5>
        </div>
        {chartData.length === 0 
        ? (<p className='h-full flex justify-center items-center text-lg'>No History of expenses</p>)
        :(
            <CustomBarChart
                data={chartData}
                dataKey="category"
            />
        )}
    </div>
  )
}

export default Last30DaysExpenses