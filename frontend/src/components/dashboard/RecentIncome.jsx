import {LuArrowRight} from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from "../cards/TransactionInfoCard"


function RecentIncome({ transactions, onSeeMore }) {
  return (
    <div className='card'>
        <div className='flex items-center justify-center'>
            <h5 className='text-lg mr-4'>Income</h5>
            <button 
                className='card-btn'
                onClick={onSeeMore}
            >
                see All <LuArrowRight className='text-base'/>
            </button>
        </div>
        {transactions.length === 0 
        ? (<p className='text-center mt-3 text-lg'>No History of Incomes</p>)
        :(
            <div className='mt-6'>
                {transactions?.slice(0,5)?.map((item) => {
                    return(
                        <TransactionInfoCard
                            key={item._id}
                            title={item.source}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM YYYY")}
                            amount={item.amount}
                            type="income"
                            hideDeleteBtn
                        />
                    )
                })}
            </div>
        )}
    </div>
  )
}

export default RecentIncome