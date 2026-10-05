import { useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup';

function AddExpenseForm({ onAddExpense }) {
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: ""
    });

    const handleChange = (key, value) => setExpense({...expense, [key]: value});
  return (
    <div className=''>

        <EmojiPickerPopup
            icon={expense.icon}
            onSelect={(icon) => handleChange("icon", icon)}
        />

        <label className="text-[13px] text-slate-800">Expense Source</label>
        <input
            value={expense.source}
            onChange={({target}) => handleChange("category", target.value)}
            label="Category"
            placeholder='Rent, Groceries, etc.'
            type='text'
            className='add-form'
        />

        <label className="text-[13px] text-slate-800">Amount</label>
        <input
            value={expense.amount}
            onChange={({target}) => handleChange("amount", target.value)}
            label="Amount"
            placeholder=''
            type='number'
            className='add-form'
        />

        <label className="text-[13px] text-slate-800">Date</label>
        <input
            value={expense.date}
            onChange={({target}) => handleChange("date", target.value)}
            label="Date"
            placeholder=''
            type='date'
            className='add-form'
        />

        <div className='flex justify-end mt-6'>
            <button
                type='button'
                onClick={() => onAddExpense(expense)}
                className='add-btn add-btn-fill'
            >
                Add Expense
            </button>
        </div>
    </div>
  )
}

export default AddExpenseForm;