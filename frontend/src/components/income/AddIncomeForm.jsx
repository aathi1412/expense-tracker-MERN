import { useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup';

function AddIncomeForm({ onAddIncome }) {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: ""
    });

    const handleChange = (key, value) => setIncome({...income, [key]: value});
  return (
    <div className=''>

        <EmojiPickerPopup
            icon={income.icon}
            onSelect={(icon) => handleChange("icon", icon)}
        />

        <label className="text-[13px] text-slate-800">Income Source</label>
        <input
            value={income.source}
            onChange={({target}) => handleChange("source", target.value)}
            label="Income Source"
            placeholder='Salary, Freelance, etc.'
            type='text'
            className='add-form'
        />

        <label className="text-[13px] text-slate-800">Amount</label>
        <input
            value={income.amount}
            onChange={({target}) => handleChange("amount", target.value)}
            label="Amount"
            placeholder=''
            type='number'
            className='add-form'
        />

        <label className="text-[13px] text-slate-800">Date</label>
        <input
            value={income.date}
            onChange={({target}) => handleChange("date", target.value)}
            label="Date"
            placeholder=''
            type='date'
            className='add-form'
        />

        <div className='flex justify-end mt-6'>
            <button
                type='button'
                onClick={() => onAddIncome(income)}
                className='add-btn add-btn-fill'
            >
                Add Income
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm