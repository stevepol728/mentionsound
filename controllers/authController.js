const { validationResult } = require("express-validator");
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const hashPassword = require("../utils/common.utils");
const dotenv = require("dotenv");
dotenv.config();

/*******Auth Controller************/

const createUserWithEmail = async (req, res, next) => {
  checkValidation(req);
  // Check exist
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'This Email already exist' });
    }

    await hashPassword(req);

    const password = req.body.password;
    

    user = new User({
      email,
      password,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.send({ type: "success", message: "successful", token });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

//login handler
const userLoginWithEmail = async (req, res) => {

  checkValidation(req);
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Email is not verified' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect account or password' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        // res.setHeader('Authorization', 'Bearer '+ token); 
        // res.header('Authorization', 'Bearer '+ token);
        let options = {
          path:"/",
          sameSite:true,
          maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
          httpOnly: true, // The cookie only accessible by the web server
        }
  
        res.cookie('x-access-token',token, options)
        res.send({ type: "success", message: "successful", token });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};


//check validation express-validator
const checkValidation = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation faild' });
  }
};

module.exports = {
  createUserWithEmail,
  userLoginWithEmail
};
