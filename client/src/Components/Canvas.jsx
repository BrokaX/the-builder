import React, { useEffect, useState } from "react";

import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import plugin from "grapesjs-preset-webpage";
import forms from "grapesjs-plugin-forms";
import blocks from "grapesjs-blocks-basic";
import { templateSave } from "../apiHelpers";
import cover from "../assets/cover.jpg"

export default function Canvas() {
  const [builder, setBuilder] = useState(null);

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
      storageManager: true,
      plugins: [plugin, forms, blocks],
    });
    /* Adding a custom Save button */
    builder.Panels.addButton("options", [
      {
        id: "save",
        className: "fa fa-floppy-o icon-blank",
        command: function () {
          handleSave();
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
    const handleSave = async () => {
      try {
        const html = builder.getHtml();
        const css = builder.getCss();
        const title = "Add Title";
        const description = "Add Description";
        const image = cover;
        const date = new Date().toLocaleDateString;
        const id = "";

        const template = { title, description, html, css, image, date, id };
        const res = await templateSave(template);

        console.log(res);
        // do something with the response, such as display a success message
      } catch (error) {
        console.error(error);
        // handle the error appropriately, such as displaying an error message to the user
      }
    };

    setBuilder(builder);
  }, []);
  return (
    
    <div className="Canvas-container">
      <div className="builder" id="builder"></div>
      <div className="Open-close" onClick={changeStyle}></div>
    </div>
  );
}
