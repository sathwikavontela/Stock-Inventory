import mongoose, { model } from "mongoose";
const ItemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
});
const ReturnFormSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [ItemSchema],

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const ReturnForm = mongoose.model("ReturnForm", ReturnFormSchema);

export default ReturnForm;
