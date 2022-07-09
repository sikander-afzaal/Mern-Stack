const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    if (checkEmail) {
      const isPwdMatch = await bcrypt.compare(password, checkEmail.password); //comparing entered pwd and pwd stored in db
      token = await checkEmail.generateAuthToken(); //creating token for user
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 256000000),
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

//about section route

//middleware for our app
const middleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken; // getting token
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY); //verifing token
    if (verifyToken) {
      const signedUser = await User.findOne({
        //finding user
        _id: verifyToken._id,
        "tokens.token": token,
      });
      if (!signedUser) {
        throw new Error("User not found");
      }
      req.userId = signedUser._id;
      req.rootUser = signedUser;
      req.token = token;
    }
    next();
  } catch (err) {
    res.status(401).send("Token not provided");
  }
};

router.get("/about", middleware, (req, res) => {
  res.send(req.rootUser);
});

//route for edit info
router.post("/change", async (req, res) => {
  const { id, work, phone, name, email, checkEmail } = req.body;
  const emailUser = await User.findOne({
    email: email,
  });
  // user does not enter email to change it so we just check email if new email entered
  if (checkEmail) {
    if (emailUser) {
      return res.status(401).json({ err: "Email Already Used" });
    }
  }

  await User.updateOne(
    {
      _id: id,
    },
    {
      name: name,
      work: work,
      email: email,
      phone: phone,
    }
  );
  return res.status(200).json({ message: "changes saved" });
});

//route for contact us page
router.post("/contact", async (req, res) => {
  const { phone, message, id, email, desc, name } = req.body;
  await User.updateOne(
    { _id: id },
    {
      $push: {
        messages: {
          message: desc,
          name: name,
          email: email,
          phone: phone,
        },
      },
    }
  );
  res.status(200).json({ message: "Thank you for contacting us" });
});

//route for logout
router.get("/logout", async (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.json({ message: "logged out" });
});

module.exports = router;
