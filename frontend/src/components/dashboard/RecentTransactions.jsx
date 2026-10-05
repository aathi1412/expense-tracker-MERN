import {LuArrowRight} from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from "../cards/TransactionInfoCard"

function RecentTransactions({ transactions, onSeeMore}) {
  return (
    <div className='card'>
        <div className='flex items-center justify-center'>
            <h5 className='text-lg'>Recent Transactions</h5>
            <button 
                className='card-btn'
                onClick={onSeeMore}
            >
                see All <LuArrowRight className='text-base'/>
            </button>
        </div>
        <div className='mt-6'>
            {transactions?.slice(0,5)?.map((item) => {
                return(
                    <TransactionInfoCard
                        key={item._id}
                        title={item.type == 'expense' ? item.category : item.source}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                )
            })}
        </div>
    </div>
  )
}

export default RecentTransactions