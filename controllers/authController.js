const { validationResult } = require("express-validator");
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const hashPassword = require("../utils/common.utils");
const dotenv = require("dotenv");
dotenv.config();

/*******Auth Controller************/

const createUserWithEmail = async (req, res, next) => {
  checkValidation(req, res);
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

  checkValidation(req, res);
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

//profileUpdate handler
const profileUpdate = async (req, res) => {

  checkValidation(req, res);
  const { email, password, password_confirmation } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'This Email not exist' });
    }

    if (req.body.password !== password_confirmation) {
      return res.status(400).json({ message: 'Password does not match' });
    }

    await hashPassword(req);

    const password = req.body.password;

    try {
      await User.updateOne({email}, { $set: { password }});
      res.send({ type: "success"});
   } catch (e) {
      return res.status(500).json({ message: 'Something went wrong' });
   }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};



//profileUpdate handler
const deleteAccount = async (req, res) => {

  const email = req.body.currentUser;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'This Email not exist' });
    }
    await user.remove();
    res.send({ type: "success"});
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

//check validation express-validator
const checkValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation faild' });
  }
};

module.exports = {
  createUserWithEmail,
  userLoginWithEmail,
  profileUpdate,
  deleteAccount
};
