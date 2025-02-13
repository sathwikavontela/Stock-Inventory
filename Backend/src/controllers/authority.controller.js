import { Authority } from "../models/authority.model.js";
import { FIC } from "../models/fic.model.js";
import { User } from "../models/user.model.js";

const createAuthority = async (req, res) => {
  try {
    const { fullname, username, password, email, role } = req.body;
    if (!fullname || !username || !password || !email || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const authorityInstance = await Authority.findOne({ username });
    if (authorityInstance) {
      return res.status(400).json({ message: "Authority already exists" });
    }

    const newAuthority = await Authority.create({
      fullname,
      username,
      password,
      email,
      role,
    });
    if (!newAuthority) {
      return res
        .status(400)
        .json({ message: "Error while creating the Authority" });
    }

    return res.status(200).json({ Authority: newAuthority });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const loginAuthority = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required!" });
    }
    let member;
    if (username.startsWith("department")) {
      member = await User.findOne({ username });
      if (!member)
        return res.status(400).json({ message: "you are not authorized" });
      const isPasswordValid = await member.isPasswordCorrect(password);
      if (!isPasswordValid)
        return res.status(400).json({ message: "your password is not valid" });
      const departmentToken = await member.generateAccessToken();
      const options = {
        httpOnly: true,
        secure: true, // Ensure this is true if using HTTPS
        sameSite: "None",
      };
      return res
        .status(200)
        .cookie("departmentToken", departmentToken, options)
        .json({ member: member, departmentToken });
    } else if (username.startsWith("fic")) {
      member = await FIC.findOne({ username });
      if (!member)
        return res.status(400).json({ message: "you are not authorized" });
      const isPasswordValid = await member.isPasswordCorrect(password);
      if (!isPasswordValid)
        return res.status(400).json({ message: "your password is not valid" });
      const ficToken = await member.generateAccessToken();
      const options = {
        httpOnly: true,
        secure: true, // Ensure this is true if using HTTPS
        sameSite: "None",
      };
      return res
        .status(200)
        .cookie("ficToken", ficToken, options)
        .json({ member: member, ficToken });
    } else {
      member = await Authority.findOne({ username });
      if (!member)
        return res.status(400).json({ message: "you are not authorized" });
      const isPasswordValid = await member.isPasswordCorrect(password);
      if (!isPasswordValid)
        return res.status(400).json({ message: "your password is not valid" });
      const authorityToken = await member.generateAccessToken();
      const options = {
        httpOnly: true,
        secure: true, // Ensure this is true if using HTTPS
        sameSite: "None",
      };
      return res
        .status(200)
        .cookie("authorityToken", authorityToken, options)
        .json({ member: member, authorityToken });
    }
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
    .clearCookie("authorityToken", options)
    .json({ message: "Logged out successfully" });
};

const getDepts = async (req, res) => {
  try {
    const departments = await Authority.find();
    return res.status(200).json({ departments });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export { createAuthority, loginAuthority, logout, getDepts};
