const User = require("./../models/user.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.register = async (req, res) => {
  try {
    const { name, username, email, password, gender } = req.body;

    if (!name || !username || !email || !password || !gender) {
      return res.status(404).json({
        success: false,
        message: "Please enter all required field",
      });
    }

    const isUsernameExist = await User.exists({ username: username });
    if (isUsernameExist) {
      return res.status(403).json({
        success: false,
        message: "Username is already register with us!",
      });
    }

    const isEmailExist = await User.exists({ email: email });
    if (isEmailExist) {
      return res.status(403).json({
        success: false,
        message: "Email is already register with us!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
      gender: gender,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "30d",
    });

    user.password = undefined;

    res.status(200).json({
      success: false,
      user: { ...user._doc, token },
      message: "User account Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(403).json({
        success: false,
        message: "Please enter all required field",
      });
    }

    const user = await User.findOne({ username: username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
        expiresIn: "30d",
      });

      user.password = undefined;

      return res.status(200).json({
        success: true,
        user: { ...user._doc, token },
        message: "Logged in Successfully!",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid Credentials!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
