const ExpenseSchema = require("../models/ExpenseModel")

exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date}  = req.body
    const userId = req.user._id; 

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        if (typeof amount !== 'number' || isNaN(amount) || amount <= 0 || !/^\d+(\.\d+)?$/.test(amount)) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        const newExpense = new Expense({
            title,
            amount,
            category,
            description,
            date,
            user: userId
        });

        await newExpense.save();

        res.status(200).json({ message: 'Expense Added', expense: newExpense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getExpense = async (req, res) =>{
    const userId = req.user._id;
    try {
        const incomes = await ExpenseSchema.find({ user_id: userId }).sort({ createdAt: -1 });
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    const userId = req.user._id;
    try {
        const income = await Income.findById(id);
        if (!income) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        if (income.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You do not have permission to delete this Expense' });
        }
        await income.remove();
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}