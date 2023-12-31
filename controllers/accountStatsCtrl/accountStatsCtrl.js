const expressAsyncHandler = require("express-async-handler")
const Expense = require("../../model/Expense");
const Income = require("../../model/Income");

const accountStatsCtrl = expressAsyncHandler(async (req,res)=>{
   
   try{
     //Expenses Statistics
    const expenseStats = await Expense.aggregate([
        {$match:{amount:{$gte:0}}},
        {
            $group:{
                _id: null,
                averageExp: {$avg:"$amount"},
                totalExp: {$sum:"$amount"},
                minExp: {$min:"$amount"},
                maxExp: {$max:"$amount"},
                totalRecordsExp: {$sum:1},
            },
        },
    ]);

    //Income Statistics
    const incomeStats = await Income.aggregate([
        {$match:{amount:{$gte:0}}},
        {
            $group:{
                _id: null,
                averageIncome: {$avg:"$amount"},
                totalIncome: {$sum:"$amount"},
                minIncome: {$max:"$amount"},
                maxIncome: {$max:"$amount"},
                totalRecordsIncome: {$sum:1},
            },
        },
    ]);
    res.json({expenseStats,incomeStats});
    }
    catch(error){
       res.json(error);
    }
});

module.exports = accountStatsCtrl;