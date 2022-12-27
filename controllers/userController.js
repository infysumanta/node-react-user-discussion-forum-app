exports.getUserDetails = async (req, res) => {
  try {
    res.status(200).json({
      success: false,
      user: req.user,
      message: "User Validated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
