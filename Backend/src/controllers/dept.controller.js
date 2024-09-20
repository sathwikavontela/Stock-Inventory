const loginDept = asyncHandler(async (req, res) => {
  //req body ->data
  //username or email
  //find the user
  //check the password
  //access and refresh token generation
  //send cookies

  const { username, password } = req.body;
  //console.log(req.body);
  if (!username) {
    throw new ApiError(400, "username is required");
  }
  if (!password) {
    throw new ApiError(400, "password is required");
  }

  const existedDept = await User.findOne({ username });
  if (!existedDept) {
    throw new ApiError(404, "you are not registered yet");
  }

  const isPasswordValid = await existedDept.isPasswordCorrect(password);
  //console.log(isPasswordValid);
  if (!isPasswordValid) {
    // throw new ApiError(404, "invalid user credentials");
    return res.status(404).json({ message: "invalid user credentials" });
  }
  // res.status(200).json({
  //   user: existedUser,
  // });

  const { accessToken } = await generateAccessToken(existedUser._id);

  // console.log(accessToken);
  // console.log(refreshToken);

  //console.log(accessToken, refreshToken);

  //by default anyone from the frontend also can modify the cookies
  //but we dont want that to happen, we want to modify the cookies only from the server
  //hence we use this
  const options = {
    httpOnly: true,
    secure: true, // Ensure this is true if using HTTPS
    sameSite: "None",
  };
  //you can send with the key value pair within the string is key and another one is value
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .status(200)
    .json(
      {
        user: existedUser,
        accessToken,
        refreshToken,
      },
      "user loggedin successfully"
    );
});
