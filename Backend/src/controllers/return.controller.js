import ReturnForm from "../models/return.model.js";
import { User } from "../models/user.model.js";

const createReturnForm = async (req, res) => {
  const { items } = req.body;
  console.log(items);
  const userId = req.user._id;
  try {
    if (!items || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "user Not authorised" });
    }
    const newReturn = await ReturnForm.create({ items, userId });
    if (!newReturn) {
      return res
        .status(400)
        .json({ message: "Error while creating return request" });
    }
    const populatedReturn = await ReturnForm.findById(newReturn._id).populate(
      "userId"
    );
    return res.status(200).json({ populatedReturn });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getreturns = async (req, res) => {
  try {
    const returns = await ReturnForm.find({});
    if (!returns) {
      return res.status(400).json({ message: "Error while fetching returns" });
    }
    return res.status(200).json({ returns });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

const getReturnsForAuthority = async (req, res) => {
  try {
    const returns = await ReturnForm.find({})
      .populate("userId") // Populate the userId field from the related collection
      .exec();

    // Reverse the order of returns for latest-first ordering
    returns.reverse();

    if (!returns || returns.length === 0) {
      return res.status(404).json({ message: "No returns found" });
    }

    return res.status(200).json({ returns }); // Use plural key for clarity
  } catch (error) {
    console.error("Error fetching returns:", error.message); // Log for debugging
    return res.status(500).json({ error: error.message }); // Correct status code for server error
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  // console.log(id);
  // console.log(status);

  try {
    const updatedReturn = await ReturnForm.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    // console.log(updatedReturn);
    if (!updatedReturn) {
      return res.status(404).json({ message: "Return not found" });
    }
    res.status(200).json({ message: "Status updated", return: updatedReturn });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { createReturnForm, getreturns, getReturnsForAuthority, updateStatus };
