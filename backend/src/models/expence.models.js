import mongoose, {Schema} from 'mongoose';

const expenseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Register',
    required: true,
  },
}, {
  timestamps: true,  // adds createdAt and updatedAt automatically
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
