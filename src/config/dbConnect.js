const mongoose = require("mongoose");


const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`DB connected successfully`);
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};

module.exports = dbConnect;


//rBzWLvuaNzy4Hq0u
// mongodb+srv://me:rBzWLvuaNzy4Hq0u@expense-tracker.pchkjeq.mongodb.net/?retryWrites=true&w=majority