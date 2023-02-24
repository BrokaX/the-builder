const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys.js");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User.js");
const Templates = require("../../models/Templates.js");

//All users
router.get("/", function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(users);
    }
  });
});

//Signup
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//Login
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          status: user.status,
          date: user.date,
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              user: payload,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

//Edit User
router.put("/:id", async function (req, res) {
  const id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (!id && !name && !email) {
    return res.status(442).json({ message: "Invalid Details" });
  }
  const newPass = bcrypt.hashSync(password, 10);
  let user;
  try {
    user = await User.findByIdAndUpdate(id, { name, email, password: newPass });
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "Successfully updated" });
});

//Delete user
router.put("/:id", async function deleteUser(req, res) {
  const id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (!id && !name && !email) {
    return res.status(442).json({ message: "Invalid Details" });
  }
  const newPass = bcrypt.hashSync(password, 10);
  let user;
  try {
    user = await User.findByIdAndUpdate(id, { name, email, password: newPass });
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "Successfully updated" });
});

module.exports = router;
