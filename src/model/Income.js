const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
//schmea
const incomeSchema = mongoose.Schema(
  {
    title: {
      required: [true, "Title is required"],
      type: String,
    },
     description: {
      required: [true, "Description is required"],
      type: String,
    },
    type: {
      type: String,
      default: "income"
    },
    amount: {
      required: [true, "Amount is required"],
      type: Number,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,    //must be mongodb id
        ref: 'User',
        required:[true, "User ID is required"]
    }
  },
  {
    timestamp: true,
    toJSON: {
      virtuals:true,
  },
  toObject: {
    virtuals:true,
},
timestamp: true,
 });

//Paginate
incomeSchema.plugin(mongoosePaginate);

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
