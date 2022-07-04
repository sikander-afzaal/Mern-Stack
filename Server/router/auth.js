const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
require("../db/conn");
const User = require("../modal/userSchema");

//signin/login route------------------------------------
router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      //to check if the fields are empty or filled
      return res.status(422).json({ err: "please fill the fields" });
    }

    //checking if the user already exists in db and the entered email and pwd are correct
    const checkEmail = await User.findOne({
      email: email,
    });
    console.log(checkEmail);
    if (checkEmail) {
      const isPwdMatch = await bcrypt.compare(password, checkEmail.password); //comparing entered pwd and pwd stored in db
      token = await checkEmail.generateAuthToken(); //creating token for user
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 2560000),
        httpOnly: true,
      });

      if (isPwdMatch) {
        return res.status(200).json({ message: "login success" }); // if valid then sign in
      } else {
        res.status(404).json({ err: "credentials invalid" }); //else a popup shows that login failure
      }
    } else {
      res.status(404).json({ err: "credentials invalid" }); //else a popup shows that login failure
    }
  } catch (err) {
    console.log(err);
  }
});

//register/sign up route-------------------------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, work, phone, cpassword, password } = req.body;
    if (!name || !email || !work || !phone || !cpassword || !password) {
      //to check if the fields are empty or filled
      return res.status(422).json({ err: "please fill the fields" });
    }

    //checking if email entered is already in the database or not
    const userData = await User.findOne({ email: email });
    if (userData) {
      return res.status(422).json({ err: "user already registered" });
    } else if (password !== cpassword) {
      return res.status(422).json({ err: "two passwords not same" });
    }
    //if unique user then create a new model for the data to be stored in db
    const user = new User({
      name,
      email,
      work,
      phone,
      cpassword,
      password,
    });

    //saving the new user and then sending a message depending in the response
    const savingUser = await user.save();
    if (savingUser) {
      return res.status(201).json({ message: "user registered" });
    } else {
      return res.status(500).json({ err: "user failed to register" });
    }
  } catch (error) {
    console.log(error);
  }

  //old method using .then and above is the new async await method

  // User.findOne({ email: email })
  //   .then((response) => {
  //     if (response) {
  //       return res
  //         .status(422)
  //         .json({ err: "already registered with this email" });
  //     }
  //     //else adding a new user
  // const user = new User({
  //   name,
  //   email,
  //   work,
  //   phone,
  //   cpassword,
  //   password,
  // });
  //     user
  //       .save() //command to save it on db
  //       .then(() => {
  //         res.status(201).json({ message: "user registered" });
  //       })
  //       .catch((err) => {
  //         res.status(500).json({ error: "registeration failed" });
  //       });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
});

module.exports = router;
