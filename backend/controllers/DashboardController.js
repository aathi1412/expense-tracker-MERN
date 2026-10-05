const income = require("../models/Income");
const expense = require("../models/Expense");
const { Types } = require("mongoose");

const getDashboardData = async (req, res) => {
    const userObjectId = new Types.ObjectId(String(req.user.id));
    try {

        const totalIncome = await income.aggregate([
            { $match: {userId: userObjectId} },
            { $group: { _id: null, total: { $sum: "$amount"}}}
        ]);

        const totalExpense = await expense.aggregate([
            { $match: {userId: userObjectId} },
            { $group: { _id: null, total: { $sum: "$amount"}}}
        ]);

        const last60DaysIncomeTransaction = await income.find({
            userId: userObjectId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransaction.reduce((sum, transaction) => sum + transaction.amount, 0);

        const last30DaysExpenseTransaction = await expense.find({
            userId: userObjectId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const expenseLast30Days = last30DaysExpenseTransaction.reduce((sum, transaction) => sum + transaction.amount, 0);

        const lastTransactions = [ 
            ...(await income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map(
                transaction => ({ 
                    ...transaction.toObject(), type: "income" 
                })
            ),
            ...(await expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map(
                transaction => ({ 
                    ...transaction.toObject(), type: "expense" 
                })
            )
        ].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses:{
                total: expenseLast30Days,
                transactions: last30DaysExpenseTransaction
            },
            last60DaysIncome:{
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransaction
            },
            recentTransactions: lastTransactions,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = getDashboardData;