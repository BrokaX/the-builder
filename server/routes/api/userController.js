const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User.js");
const keys = require("../../config/keys");

//All users
const getUser = async (req, res) => {
  const id = req.params.id
  User.find({_id: id}, function (err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(user);
    }
  });
};

//Signup
const Register = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      errors.email = "Email already exists";
      console.log("test2" + errors);
      return res.status(400).json(errors);
    }

    const newUser = new User({
      image: req.body.image,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          errors.password = "Error in encrypting password";
          return res.status(400).json(errors);
        }

        newUser.password = hash;
        newUser.save()
          .then((user) => res.status(201).json(user))
          .catch((err) => {
            errors.save = "Error in saving user";
            return res.status(400).json(errors);
          });
      });
    });
  } catch (err) {
    errors.general = "Failed to register user";
    return res.status(400).json(errors);
  }
};



//Login
const Login = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ emailnotfound: "Incorrect Email or Password" });
    }
    const isMatch = await bcrypt.compare(password, user.password); // add await here
    if (isMatch) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image,
        date: user.date,
      };
      jwt.sign(
        {id: payload.id},
        keys.secretOrKey,
        { expiresIn: "1d"},
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({
            success: true,
            token: token,
            user: payload,
            id: payload.id
          });
        }
      );
    } else {
      return res
        .status(400)
        .json({ passwordincorrect: "Incorrect Email or Password" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


//Edit User
const editUser = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const image = req.body.image
  if (!id && !name && !email) {
    return res.status(442).json({ message: "Invalid Details" });
  }
  let user;
  try {
    user = await User.findByIdAndUpdate(id, { name, email, image });
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "Successfully updated" });
};

//Edit uers's Password
const editUserPassword = async (req, res) => {
  const id = req.params.id;
  const password = req.body.password;
  if (!id && !password) {
    return res.status(442).json({ message: "Invalid Details" });
  }
  const newPass = bcrypt.hashSync(password, 10);
  let user;
  try {
    user = await User.findByIdAndUpdate(id, { password: newPass });
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "Password Successfully updated" });
};

//Delete user
const deleteUser = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "User Successfully Deleted" });
};

module.exports = { getUser, Register, Login, editUser, deleteUser, editUserPassword };
