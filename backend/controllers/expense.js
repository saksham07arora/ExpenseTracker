const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date, user}  = req.body

    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        user
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getExpense = async (req, res) =>{
    try {
        const {id} = req.params
        const incomes = await ExpenseSchema.find({"user" : id}).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}
exports.getCategoryTotals = async (req, res) => {
    try {
        const { id } = req.params; // Assuming the user ID is passed in params
        const totals = await ExpenseSchema.aggregate([
            {
                $match: { user: id } // Filter by user ID
            },
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        res.status(200).json(totals);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
