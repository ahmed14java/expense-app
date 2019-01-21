const Expense = require('../models/Expense');
const expenseController = {};

expenseController.create = async (req,res,next) => {
    const {ammount,description,created} = req.body;
    const newExpense = new Expense({
        ammount,
        description,
        created,
        owner: req.user
    });
    try {
        const saved = await newExpense.save();
        return res.send({
            success: true,
            expense: saved
        })
    } catch (e) {
        next(e);
    }
};

expenseController.get = async (req,res,next) => {
    const now = new Date();

    // get month from request
    const month = parseInt(req.params.month);
    if (month && month >= 0 && month <= 11) {
        now.setMonth(month);
    }


    const firstDay = new Date(now.getFullYear() , now.getMonth() , 1);
    const lastDay = new Date(now.getFullYear() , now.getMonth() + 1, 0);
    const query = {
        owner: req.user._id,
        created: {
            $gte: firstDay,
            $lt: lastDay
        }
    }
    try {
        const expense = await Expense.find(query).sort({created: 'desc'});    
        return res.send({expense});
    } catch (e) {
        next(e);
    }
    
};

expenseController.delete = async (req,res,next) => {
    const id = req.params.id;
    try {
        const check = await Expense.findOne({_id: id});
        if (!check.owner.equals(req.user._id)) {
            const err = new Error('This Expense object does not belong to you!');
            err.status = 401;
            throw err;
        }
        await Expense.deleteOne({_id: id});    
        res.send({success: true});
    } catch (e) {
        next(e);
    }
};

expenseController.update = async (req,res,next) => {
    const id = req.params.id;
    const {ammount,description,created} = req.body;
    try {

        const check = await Expense.findOne({_id: id});
        if (!check.owner.equals(req.user._id)) {
            const err = new Error('This Expense object does not belong to you!');
            err.status = 401;
            throw err;
        }

        const expense = await Expense.update({_id: id} , {ammount,description,created});
        return res.send({
            success: true,
            expense
        })
    } catch (e) {
        next(e);
    }
} 



module.exports = expenseController;