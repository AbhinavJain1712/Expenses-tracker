const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const { errorHandler, notFound } = require("./middlewares/errorMiddlewares");
const userRoute = require("./routes/users/usersRoute");
const incomeRoute = require("./routes/income/incomeRoute");
const expenseRoute = require("./routes/expense/expenseRoute");
const accountStatsRoute = require("./routes/accountStatsRoute/accountStatsRoute");

const app = express();
dotenv.config();
//dbConnect
dbConnect();

//middleware
app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{
    res.json({msg:"Welcome to Expense Tracker API"});
})
// usersroutes
app.use("/api/users", userRoute);

// account statistics
app.use("/", accountStatsRoute);

//income routes
app.use("/api/income", incomeRoute);
//expenses routes
app.use("/api/expenses", expenseRoute);

//error
app.use(notFound);
app.use(errorHandler);

module.exports = app;
