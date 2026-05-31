const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");


// REGISTER USER
const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;
   if (!validator.isEmail(email)) {

  return res.status(400).json({
    message: "Invalid Email"
  });

} 
    const userExists = await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    const salt = await bcrypt.genSalt(10);
    const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

if (!passwordRegex.test(password)) {

  return res.status(400).json({
    message:
      "Password must contain uppercase, lowercase, number, special character and minimum 8 characters"
  });

}

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({

      name,
      email,
      password: hashedPassword

    });

    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "30d"
      }

    );

    res.status(201).json({

      token,

      user: {
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role
}

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};




// LOGIN USER
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "30d"
      }

    );

    res.status(200).json({

      token,

      user: {
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role
}

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};



module.exports = {
  registerUser,
  loginUser
};