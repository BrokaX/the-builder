const express = require("express");
const templateRouter = express.Router();

//Website templates controllers

const {
  saveTemplate,
  getAllTemplatesByUser,
  deleteTemplate,
} = require("./templatesController");

//Website templates routes

templateRouter.get("/saved", getAllTemplatesByUser);
templateRouter.post("/save", saveTemplate);
templateRouter.delete("/:id", deleteTemplate);

module.exports = templateRouter;

