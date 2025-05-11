const expressAsyncHandler = require("express-async-handler");
const Expense = require('../../model/Expense');

//create expense
const createExpCtrl = expressAsyncHandler(async (req, res) =>{
    const {title,amount,description} = req.body;
    try{
        const expense = await Expense.create({
            title,amount,description,user:req?.user?._id,
        });
        res.json(expense);
    }catch(error){
        res.json(error);
    }
})

// fetch expense
const fetchAllExpCtrl = expressAsyncHandler(async (req, res) => {
    const { page } = req.query;

    try {
        // Log user info to debug
        console.log("User Info:", req.user);

        // Ensure req.user is defined and has the necessary fields
        if (!req.user || req.user.isAdmin === false || !req.user._id) {
            return res.status(403).json({ message: "User information is missing or incomplete" });
        }

        // Determine filter based on admin status
        const filter = req.user.isAdmin ? {} : { user: req.user._id };

        const expense = await Expense.paginate(filter, {
            limit: 10,
            page: Number(page),
            populate: "user",
        });
        res.json(expense);
    } catch (error) {
        res.json(error);
    }
});


//fetch single
const fetchExpDetailsCtrl = expressAsyncHandler(async (req, res) =>{
    const {id} = req?.params;
    
    try{
        const expense = await Expense.findById(id);
        res.json(expense);
    }catch(error){
        res.json(error);
    }
})

//update
const updateExpCtrl = expressAsyncHandler(async (req, res)=>{
      const {id} = req?.params;
       const {title,description,amount} = req.body;
    try{
        const expense = await Expense.findByIdAndUpdate(id,{
            title,description,amount,
        },{new:true});
        res.json(expense);
    }catch(error){
        res.json(error);
    }
})

const deleteExpCtrl = expressAsyncHandler(async (req, res) =>{
    const {id} = req?.params;
    
    try{
        const expense = await Expense.findByIdAndDelete(id);
        res.json(expense);
    }catch(error){
        res.json(error);
    }
})


module.exports = {createExpCtrl,fetchAllExpCtrl , fetchExpDetailsCtrl,updateExpCtrl,deleteExpCtrl};