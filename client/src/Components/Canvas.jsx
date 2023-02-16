import React, { useEffect, useState } from "react";

import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import plugin from "grapesjs-preset-webpage";
import forms from "grapesjs-plugin-forms";
import blocks from "grapesjs-blocks-basic";
export default function Canvas() {
  const [, setBuilder] = useState(null);

  const changeStyle = () => {
    const element = document.getElementsByClassName("gjs-pn-views-container")[0]
      .style;
    if (element.display === "none") {
      element.display = "block";
    } else {
      element.display = "none";
    }
  };
  const openMenu = function () {
    const menu = document.getElementById("open-menu");
    menu.addEventListener("click", changeStyle);
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

    const handleSave = () => {
      const content = builder.getHtml();
      const css = builder.getCss();
      console.log(css, content);
      // send the content and CSS to the server.
    };
    setBuilder(builder);
  }, []);

  return (
    <div className="Canvas-container">
      <div className="builder" id="builder"></div>
      <div className="Open-close" onClick={changeStyle}>
      </div>
    </div>
  );
}
