const sendToken = async (user, statusCode, res) => {
  try {
    const token = await user.getJWTToken();

    const options = {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error("Error sending token:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = sendToken;
