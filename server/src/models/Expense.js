const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    ammount: {type: Number , required: true},
    description: {type: String},
    created: {type: Date, required: true},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


const Expense = mongoose.model('Expenser' , ExpenseSchema)
module.exports = Expense;