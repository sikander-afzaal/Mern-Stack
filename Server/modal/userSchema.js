const mongooseClient = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//structure of data that will be stored in the database
const userSchema = new mongooseClient.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  work: {
    type: String,
    require: true,
  },
  cpassword: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  messages: [
    {
      message: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
});
// hashing passwords ----------------
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

//generating token for the user
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const User = mongooseClient.model("USER", userSchema); //collection inside a database

module.exports = User;
