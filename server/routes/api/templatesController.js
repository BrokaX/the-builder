const Templates = require("../../models/Templates.js");
const Jwt = require("jsonwebtoken");
const keys = require("../../config/keys.js");
const saveTemplate = async (req, res) => {
  const extractedToken = req.headers.authorization.slice(7);
  if (!extractedToken || extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token not found" });
  }
  let userId;
  Jwt.verify(extractedToken, keys.secretOrKey, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err}` });
    } else {
      userId = decrypted.id;
      return;
    }
  });

  // save website template
  const { title, description, html, CSS, image, date } = req.body;
  if (!title) {
    return res.status(422).json({ message: "Missing template info" });
  }
  let template;
  try {
    template = new Templates({
      title,
      description,
      html,
      CSS,
      image,
      date,
      user: userId,
    });
    template = await template.save();
  } catch (err) {
    return console.log(err);
  }
  if (!template) {
    return res.status(422).json({ message: "Failed request" });
  }
  return res.status(201).json({ template });
};

//Delete Template
const deleteTemplate = async (req, res) => {
  const id = req.params.id;
  let template;
  try {
    template = await Templates.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!template) {
    return res.status(500).json({ message: "Template not found" });
  }
  return res.status(200).json({ message: "Template Successfully Deleted" });
};

// Get All User Templates
const getAllTemplatesByUser = async (req, res) => {
  const extractedToken = req.headers.authorization.slice(7);
  if (!extractedToken || extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token not found" });
  }
  Jwt.verify(extractedToken, keys.secretOrKey, async (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err}` });
    } else {
      const userID = decrypted.id;
      if (!userID) {
        return res
          .status(442)
          .json({ message: "You do not have permission to view this page" });
      }
      let template;
      try {
        template = await Templates.find({ user: userID });
      } catch (err) {
        console.log(err);
      }
      if (!template) {
        return res.status(500).json({ message: "Nothing to see here" });
      }
      return res.status(200).json(template);
    }
  });
};

// Get Template by ID

const getAllTemplatesById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(442).json({ message: "Template not found" });
  }
  let template;
  try {
    template = await Templates.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!template) {
    return res.status(500).json({ message: "Nothing to see here" });
  }
  return res.status(200).json(template);
};

module.exports = {
  saveTemplate,
  getAllTemplatesByUser,
  deleteTemplate,
  getAllTemplatesById,
};
