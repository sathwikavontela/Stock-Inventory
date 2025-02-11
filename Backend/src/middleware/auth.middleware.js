import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Authority } from "../models/authority.model.js";
import { FIC } from "../models/fic.model.js";

export const verifyJwt = (req, res, next) => {
  console.log(req);
  const token = req.cookies.departmentToken;
  console.log(token);
  // console.log(token)
  if (!token) {
    return res.status(401).json({ message: "Unauthorized request" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //console.log(decodedToken)

    // Find the user by the decoded token's ID, and exclude password and refreshToken
    User.findById(decodedToken?._id)
      .then((loggedInUser) => {
        if (!loggedInUser) {
          return res.status(400).json({ message: "Invalid access token" });
        }

        req.user = loggedInUser; // Attach the user to the request object
        //console.log(req.user);
        next(); // Proceed to the next middleware or route handler
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "Server error", error: error.message });
      });
  } catch (error) {
    // If JWT verification fails
    return res
      .status(401)
      .json({ message: error.message || "Invalid access token" });
  }
};

export const verifyAuthority = (req, res, next) => {
  try {
    const authorityToken = req.cookies.authorityToken;
    if (!authorityToken) {
      return res.status(400).json({ message: "user not authorised" });
    }
    const decodedAuthorityToken = jwt.verify(
      authorityToken,
      process.env.AUTHORITY_TOKEN_SECRET
    );
    Authority.findById(decodedAuthorityToken?._id)
      .then((loggedInAuthorityUser) => {
        if (!loggedInAuthorityUser) {
          return res.status(400).json({ message: "Invalid access token" });
        }
        req.user = loggedInAuthorityUser; // Attach the user to the request object
        // console.log(req.user);
        next();
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "Server error", error: error.message });
      });
  } catch (error) {
    return res
      .status(401)
      .json({ message: error.message || "Invalid access token" });
  }
};

export const verifyFic = (req, res, next) => {
  try {
    const ficToken = req.cookies.ficToken;
    //console.log(ficToken);
    if (!ficToken) {
      //console.log(ficToken);
      return res.status(400).json({ message: "user not authorised" });
    }
    const decodedFicToken = jwt.verify(
      ficToken,
      process.env.INCHARGE_TOKEN_SECRET
    );
    //console.log(decodedFicToken);
    FIC.findById(decodedFicToken?._id)
      .then((loggedInFicUser) => {
        if (!loggedInFicUser) {
          return res.status(400).json({ message: "Invalid access token" });
        }
        req.user = loggedInFicUser; // Attach the user to the request object
        // console.log(req.user);
        next();
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "Server error", error: error.message });
      });
  } catch (error) {
    return res
      .status(401)
      .json({ message: error.message || "Invalid access token" });
  }
};
