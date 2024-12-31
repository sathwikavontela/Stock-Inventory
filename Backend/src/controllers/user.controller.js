//import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import RequestForm from "../models/request.model.js";

const generateAccessToken = async (userId) => {
  try {
    //console.log(userId)
    const userInstance = await User.findById(userId);
    //console.log(userInstance)
    const accessToken = await userInstance.generateAccessToken();
    //console.log(accessToken)
    //userInstance.save({ validateBeforeSave: false }) //used when sesion token is used in the code
    return accessToken;
  } catch (error) {
    throw new ApiError(400, "something went wrong while generating the token");
  }
};

const createDept = async (req, res) => {
  try {
    const { fullname, username, password, email, department } = req.body;
    // console.log(fullname, username, password, email, role, department);
    if (!fullname || !username || !password || !email || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userInstance = await User.findOne({ username });
    if (userInstance) {
      return res.status(400).json({ message: "User already exists" });
    }
    //console.log(userInstance);

    const newUser = await User.create({
      fullname,
      username,
      password,
      email,
      department,
    });
    if (!newUser) {
      return res.status(400).json({ message: "Error while creating the User" });
    }

    return res.status(200).json({ User: newUser });
  } catch (error) {
    //console.log("udhfd");
    return res.status(400).json({ message: error.message });
  }
};

const getDepts = async (req, res) => {
  try {
    const departments = await User.find({});
    console.log(departments);
    if (!departments) {
      return res.status(400).json({ message: "No departments found" });
    }
    return res.status(200).json({ departments: departments });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// const loginUser = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     //console.log(username, password)
//     if (!username || !password) {
//       return res
//         .status(400)
//         .json({ message: "username and password are required!" });
//     }

//     const existedUser = await User.findOne({ username });
//     //console.log(existedUser)
//     if (!existedUser) {
//       return res.status(400).json({ message: "user not exists" });
//     }
//     const isPasswordValid = await existedUser.isPasswordCorrect(password);
//     //console.log(isPasswordValid)
//     if (!isPasswordValid) {
//       return res
//         .status(400)
//         .json({ message: "username or password incorrect" });
//     }
//     const accessToken = await generateAccessToken(existedUser._id);
//     //console.log({ accessToken })
//     const options = {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//     };
//     res
//       .status(200)
//       .cookie("accessToken", accessToken, options)
//       .json({ user: existedUser, accessToken });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

const logoutUser = async (req, res) => {
  //console.log(req.user);
  //await Department.findByIdAndUpdate(req.member._id);
  const options = {
    path: "/",
    secure: true,
    sameSite: "None",
  };
  return res
    .status(200)
    .clearCookie("departmentToken", options)
    .json({ message: "Logged out successfully" });
};

const getApprovedProducts = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user._id;
    console.log(startDate);
    console.log("your logged in user id is", userId);
    // Validate date range input
    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "startDate and endDate are required query parameters.",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }
    // MongoDB aggregation pipeline
    const results = await RequestForm.aggregate([
      // Match only approved requests within the date range
      {
        $match: {
          status: "Approved",
          updatedAt: { $gte: start, $lte: end },
          userId: userId,
        },
      },
      // Debug to see documents passing the match stage
      { $project: { status: 1, updatedAt: 1, items: 1 } },
      // Unwind items array to prepare for grouping
      { $unwind: "$items" },
      // Group by product name and calculate total quantity
      {
        $group: {
          _id: "$items.item", // Group by product name
          totalQuantity: { $sum: "$items.quantity" }, // Sum the quantities
          latestUpdate: { $max: "$updatedAt" }, // Get the latest update date
        },
      },
      // Sort by latest update date (descending)
      { $sort: { latestUpdate: -1 } },
    ]);
    return res.status(200).json({ products: results });
  } catch (error) {
    console.error("Error fetching approved products:", error);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

const getApprovedProductsForAuthority = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const { dept } = req.body; // Retrieve department from the request body
    const userId = req.userId; // Assuming `userId` is available in the request object via middleware

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Department:", dept);
    console.log("User ID:", userId);

    // Validate date range input
    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "startDate and endDate are required query parameters.",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }

    // Validate department input
    if (!dept) {
      return res.status(400).json({
        message: "Department (dept) is required in the request body.",
      });
    }

    // MongoDB aggregation pipeline
    const results = await RequestForm.aggregate([
      // Match only approved requests within the date range and department
      {
        $match: {
          status: "Approved",
          updatedAt: { $gte: start, $lte: end },
          department: dept, // Add department filter
        },
      },
      // Debug to see documents passing the match stage
      { $project: { status: 1, updatedAt: 1, items: 1 } },
      // Unwind items array to prepare for grouping
      { $unwind: "$items" },
      // Group by product name and calculate total quantity
      {
        $group: {
          _id: "$items.item", // Group by product name
          totalQuantity: { $sum: "$items.quantity" }, // Sum the quantities
          latestUpdate: { $max: "$updatedAt" }, // Get the latest update date
        },
      },
      // Sort by latest update date (descending)
      { $sort: { latestUpdate: -1 } },
    ]);

    return res.status(200).json({ products: results });
  } catch (error) {
    console.error("Error fetching approved products:", error);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

export {
  createDept,
  logoutUser,
  getDepts,
  getApprovedProducts,
  getApprovedProductsForAuthority,
};
