import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Register",
      required: true,
    },
    totalBudget: {
      type: Number,
      required: true,
      default: 0,
    },
    allocations: [
      {
        category: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Budget = mongoose.model("Budget", budgetSchema);
