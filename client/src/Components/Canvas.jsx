import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Handle Notifications
import { toast } from "react-toastify";

//GrapesJS & Dependencies
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import plugin from "grapesjs-preset-webpage";
import forms from "grapesjs-plugin-forms";
import blocks from "grapesjs-blocks-basic";

//API That handles saving the websites template
import { templateSave } from "../apiHelpers";


export default function Canvas() {
  const [savedTemplate, setSavedTemplate] = useState({
    html: '',
    css: ''
  });
  const navigate = useNavigate();
  const [builder, setBuilder] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  //Default template details
  const [title, setTitle] = useState("Add title");
  const [description, setDescription] = useState("Add description");
  const [image, setImage] = useState(
    "https://www.lambdatest.com/blog/wp-content/uploads/2018/11/JPG-2.jpg"
  );
  //Custom function user to open the side menu
  const changeStyle = () => {
    const element = document.getElementsByClassName("gjs-pn-views-container")[0]
      .style;
    if (element.display === "none") {
      element.display = "block";
    } else {
      element.display = "none";
    }
  };

  useEffect(() => {
    /* Creating the main builder's Canvas */
    const builder = grapesjs.init({
      container: "#builder",
      fromElement: false,
      width: "auto",
      height: "95vh",
      storageManager: { type: "local" },
      plugins: [plugin, forms, blocks],
    });
    /* Adding a custom Save button */
    builder.Panels.addButton("options", [
      {
        id: "save",
        className: "fa fa-floppy-o icon-blank",
        command: function () {
          setShowSaveModal(true);
        },
        attributes: { title: "Save Template" },
        togglable: false,
      },
    ]);
    builder.Panels.addButton("views", [
      {
        id: "open-menu",
        className: "fa-solid fa-bars",
        command: changeStyle,
        attributes: { title: "Open Menu", id: "open-menu", disabled: true },
        active: false,
        togglable: false,
        run: changeStyle,
      },
    ]);

    setBuilder(builder);
  }, []);
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const html = builder.getHtml();
      const css = builder.getCss();
      const date = new Date().toLocaleDateString();
      const id = "";
      const template = { title, description, html, css, image, date, id };
      const res = await templateSave(template);
      toast.success(`Template "${template.title}" Has been saved`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        style: { backgroundColor: "#1b3152", color: "#d7eefa" },
      });

      setShowSaveModal(false);
      navigate("/profile");
    } catch (error) {
      toast.error(`${error.message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        style: { backgroundColor: "#1b3152", color: "#d7eefa" },
      });
    }
  };

  return (
    <div className="Canvas-container">
      <div className="builder" id="builder"></div>
      <div className="Open-close" onClick={changeStyle}></div>
      {/* render the form/modal */}
      {showSaveModal && (
        <div className="save-template-form">
          <div className="modal-content">
            <span className="close" onClick={() => setShowSaveModal(false)}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
            <form onSubmit={handleSave}>
              <h1 className="Canvas-template-title">Add details to your template</h1>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onClick={() => setTitle("")}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onClick={() => setDescription("")}
                required
              />

              <label>Image URL:</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                onClick={() => setImage("")}
                
              />

              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button onClick={() => setShowSaveModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
