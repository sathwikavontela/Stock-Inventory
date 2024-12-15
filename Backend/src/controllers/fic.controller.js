import { FIC } from "../models/fic.model.js";

const generateAccessToken = async (ficId) => {
  try {
    const ficInstance = await FIC.findById(ficId);
    const ficToken = await ficInstance.generateAccessToken();
    return ficToken;
  } catch (error) {
    throw new Error("Something went wrong while generating the token");
  }
};

const createFIC = async (req, res) => {
  try {
    const { fullname, username, password, email, role } = req.body;
    if (!fullname || !username || !password || !email || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const ficInstance = await FIC.findOne({ username });
    if (ficInstance) {
      return res.status(400).json({ message: "FIC already exists" });
    }

    const newFIC = await FIC.create({
      fullname,
      username,
      password,
      email,
      role,
    });
    if (!newFIC) {
      return res.status(400).json({ message: "Error while creating the FIC" });
    }

    return res.status(200).json({ FIC: newFIC });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  //console.log(req.user);
  //await Department.findByIdAndUpdate(req.member._id);
  const options = {
    path: "/",
    secure: true,
    sameSite: "None",
  };
  return res
    .status(200)
    .clearCookie("ficToken", options)
    .json({ message: "Logged out successfully" });
};

export { createFIC, logout };
