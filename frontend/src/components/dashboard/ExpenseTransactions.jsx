import TransactionInfoCard from "../cards/TransactionInfoCard"
import {LuArrowRight} from 'react-icons/lu';
import moment from 'moment';


function ExpenseTransactions({ transactions, onSeeMore}) {
  return (
    <div className='card'>
        <div className='flex items-center justify-center'>
            <h5 className='text-lg mr-4'>Expenses</h5>
            <button 
                className='card-btn'
                onClick={onSeeMore}
            >
                see All <LuArrowRight className='text-base'/>
            </button>
        </div>
        {transactions.length === 0 
        ? (<p className='h-full flex justify-center items-center text-lg'>Add your expenses</p>)
        :(
            <div className=''>
                {transactions?.slice(0,5)?.map((item) => {
                    return(
                        <TransactionInfoCard
                            key={item._id}
                            title={item.category}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM YYYY")}
                            amount={item.amount}
                            type="expense"
                            hideDeleteBtn
                        />
                    )
                })}
            </div>
        )}
    </div>
  )
}

export default ExpenseTransactions